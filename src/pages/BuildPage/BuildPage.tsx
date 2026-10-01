import { useState } from 'react'
import { GearCatalog } from '#/components/GearCatalog'
import { useCatalogSlug } from '#/lib/catalog/use-catalog-slug'
import {
  BUILD_SOCKET_ROWS,
  type BuildLoadout,
  type BuildSocketDefinition,
} from '#/types/data/build'
import type { Gear, GearRarity, GearType } from '#/types/data/gear'
import { BuildLoadoutPanel } from './BuildLoadoutPanel'
import styles from './BuildPage.module.css'

export type BuildPageProps = {
  gear: Array<Gear>
  initialSlug?: string | null
}

function socketKind(id: string): GearType | undefined {
  return BUILD_SOCKET_ROWS.flatMap((row) => row.sockets).find((socket) => socket.id === id)?.kind
}

export function BuildPage({ gear, initialSlug = null }: BuildPageProps) {
  const [title, setTitle] = useState('Untitled build')
  const { selectedSlug, selectSlug, query, setQuery } = useCatalogSlug(initialSlug)
  const [typeFilter, setTypeFilter] = useState<GearType | null>(null)
  const [rarityFilter, setRarityFilter] = useState<GearRarity | null>(null)
  const [activeSocketId, setActiveSocketId] = useState<string | null>(null)
  const [loadout, setLoadout] = useState<BuildLoadout>({})

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
    selectSlug(item.slug)

    if (!activeSocketId) {
      return
    }

    const kind = socketKind(activeSocketId)
    if (kind && item.type !== kind) {
      return
    }

    setLoadout((current) => ({ ...current, [activeSocketId]: item }))
  }

  function handleSocketClear(socketId: string) {
    setLoadout((current) => {
      if (!(socketId in current)) {
        return current
      }

      const next = { ...current }
      delete next[socketId]
      return next
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <BuildLoadoutPanel
          title={title}
          onTitleChange={setTitle}
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
