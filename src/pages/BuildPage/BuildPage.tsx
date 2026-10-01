import { useState } from 'react'
import { GearCatalog } from '#/components/GearCatalog'
import type { BuildSearch } from '#/lib/build/build-search'
import { useBuildLoadout } from '#/lib/build/use-build-loadout'
import { useBuildName } from '#/lib/build/use-build-name'
import { useSaveBuild } from '#/lib/build/use-save-build'
import { useCatalogSlug } from '#/lib/catalog/use-catalog-slug'
import { BUILD_SOCKET_ROWS, type BuildSocketDefinition } from '#/types/data/build'
import type { Gear, GearRarity, GearType } from '#/types/data/gear'
import { BuildLoadoutPanel } from './BuildLoadoutPanel'
import styles from './BuildPage.module.css'

export type BuildPageProps = {
  gear: Array<Gear>
  search: BuildSearch
}

function socketKind(id: string): GearType | undefined {
  return BUILD_SOCKET_ROWS.flatMap((row) => row.sockets).find((socket) => socket.id === id)?.kind
}

export function BuildPage({ gear, search }: BuildPageProps) {
  const { title, setTitle, dirty, saveName } = useBuildName(search.name ?? null)
  const { selectedSlug, setSelectedSlug, selectSlug, query, setQuery } = useCatalogSlug(
    search.slug ?? null,
  )
  const { loadout, equip, clearSocket } = useBuildLoadout(gear, search)
  const savedBuilds = useSaveBuild(search)
  const [typeFilter, setTypeFilter] = useState<GearType | null>(null)
  const [rarityFilter, setRarityFilter] = useState<GearRarity | null>(null)
  const [activeSocketId, setActiveSocketId] = useState<string | null>(null)

  function handleSocketSelect(socket: BuildSocketDefinition) {
    if (socket.id === activeSocketId) {
      setActiveSocketId(null)
      setTypeFilter(null)
      return
    }

    setActiveSocketId(socket.id)
    setTypeFilter(socket.kind)
  }

  function handleTypeFilterChange(type: GearType | null) {
    setTypeFilter(type)
    setActiveSocketId((current) => {
      if (!current || !type || socketKind(current) !== type) {
        return null
      }

      return current
    })
  }

  function handleItemSelect(item: Gear) {
    const kind = activeSocketId ? socketKind(activeSocketId) : undefined
    if (activeSocketId && kind && item.type === kind) {
      setSelectedSlug(item.slug)
      equip(activeSocketId, item)
      return
    }

    selectSlug(item.slug)
  }

  function handleSocketClear(socketId: string) {
    clearSocket(socketId)
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <BuildLoadoutPanel
          title={title}
          onTitleChange={setTitle}
          showSave={dirty}
          onSave={saveName}
          savedBuilds={savedBuilds}
          rows={BUILD_SOCKET_ROWS}
          loadout={loadout}
          activeSocketId={activeSocketId}
          onSocketSelect={handleSocketSelect}
          onSocketClear={handleSocketClear}
        />
        <GearCatalog
          gear={gear}
          typeFilter={typeFilter}
          onTypeFilterChange={handleTypeFilterChange}
          rarityFilter={rarityFilter}
          onRarityFilterChange={setRarityFilter}
          selectedSlug={activeSocketId ? (loadout[activeSocketId]?.slug ?? null) : selectedSlug}
          onItemSelect={handleItemSelect}
          query={query}
          onQueryChange={setQuery}
        />
      </div>
    </div>
  )
}
