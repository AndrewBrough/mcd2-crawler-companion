import { useEffect, useRef, useState } from 'react'
import type { BuildSearch } from '#/lib/build/build-search'
import { targetSocketId } from '#/lib/build/target-socket'
import { useBuildLoadout } from '#/lib/build/use-build-loadout'
import { useBuildName } from '#/lib/build/use-build-name'
import { useSaveBuild } from '#/lib/build/use-save-build'
import { useCatalogSlug } from '#/lib/catalog/use-catalog-slug'
import { BUILD_SOCKET_ROWS, type BuildLoadout, type BuildSocketDefinition } from '#/types/data/build'
import type { Effect } from '#/types/data/effect'
import type { Gear, GearRarity, GearType } from '#/types/data/gear'
import { BuildGearStage } from './BuildGearStage/BuildGearStage'
import { BuildLoadoutPanel } from './BuildLoadoutPanel'
import { usePreserveCatalogScroll } from './use-preserve-catalog-scroll'
import styles from './BuildPage.module.css'
import { PageHeader } from '#/components/PageHeader'

export type BuildPageProps = {
  gear: Array<Gear>
  effects: Array<Effect>
  search: BuildSearch
}

function socketKind(id: string): GearType | undefined {
  return BUILD_SOCKET_ROWS.flatMap((row) => row.sockets).find((socket) => socket.id === id)?.kind
}

function socketIdForSlug(loadout: BuildLoadout, slug: string | undefined): string | null {
  if (!slug) {
    return null
  }

  return Object.entries(loadout).find(([, item]) => item.slug === slug)?.[0] ?? null
}

export function BuildPage({ gear, effects, search }: BuildPageProps) {
  const { title, setTitle, dirty, saveName } = useBuildName(search.name ?? null)
  const { selectedSlug, selectSlug, clearSlug, query, setQuery } = useCatalogSlug(search.slug ?? null)
  const { loadout, equip, clearSocket, removeSlug } = useBuildLoadout(gear, search)
  const { savedBuilds, removeSavedBuild } = useSaveBuild(search)
  const [typeFilter, setTypeFilter] = useState<GearType | null>(null)
  const [rarityFilter, setRarityFilter] = useState<GearRarity | null>(null)
  const [activeSocketId, setActiveSocketId] = useState<string | null>(() =>
    socketIdForSlug(loadout, search.slug),
  )
  const retainSocket = useRef(false)

  useEffect(() => {
    if (search.slug) {
      const socketId = socketIdForSlug(loadout, search.slug)
      if (socketId) {
        setActiveSocketId(socketId)
      }
      return
    }

    if (retainSocket.current) {
      retainSocket.current = false
      return
    }

    setActiveSocketId(null)
  }, [loadout, search.slug])
  const [showDetails, setShowDetails] = useState(() =>
    gear.some((item) => item.slug === search.slug),
  )

  useEffect(() => {
    if (!search.slug) {
      return
    }
    if (gear.some((item) => item.slug === search.slug)) {
      setShowDetails(true)
    }
  }, [gear, search.slug])
  const rememberCatalogScroll = usePreserveCatalogScroll(!showDetails)
  const inspected = gear.find((item) => item.slug === selectedSlug) ?? null
  const detailItem = showDetails ? inspected : null
  const inBuild = Boolean(detailItem && Object.values(loadout).some((item) => item.slug === detailItem.slug))

  function handleSocketSelect(socket: BuildSocketDefinition) {
    if (socket.id === activeSocketId) {
      setActiveSocketId(null)
      setTypeFilter(null)
      setShowDetails(false)
      clearSlug()
      return
    }

    setActiveSocketId(socket.id)
    setTypeFilter(socket.kind)
    const item = loadout[socket.id]
    if (item) {
      rememberCatalogScroll()
      selectSlug(item.slug)
      setShowDetails(true)
      return
    }

    if (search.slug) {
      retainSocket.current = true
    }
    clearSlug()
    setShowDetails(false)
  }

  function handleTypeFilterChange(type: GearType | null) {
    setTypeFilter(type)
    setActiveSocketId((current) => (!current || !type || socketKind(current) !== type ? null : current))
  }

  function handleAdd() {
    if (!detailItem) return
    const socketId = targetSocketId(loadout, activeSocketId, detailItem)
    if (!socketId) return
    setTypeFilter(detailItem.type)
    equip(socketId, detailItem)
    setActiveSocketId(null)
    setShowDetails(false)
    clearSlug()
  }

  function handleRemove() {
    if (!detailItem) return
    removeSlug(detailItem.slug)
    setActiveSocketId(null)
    setShowDetails(false)
    clearSlug()
  }

  return (
    <div className={styles.page}>
      {/* <PageHeader title="Save a Loadout" description="Save gear, their effects and enchantments to a loadout. Save and switch between loadouts. Optimize your next build." /> */}
      <div className={styles.layout}>
        <BuildLoadoutPanel
          title={title}
          onTitleChange={setTitle}
          showSave={dirty}
          onSave={saveName}
          savedBuilds={savedBuilds}
          onDeleteBuild={removeSavedBuild}
          rows={BUILD_SOCKET_ROWS}
          loadout={loadout}
          activeSocketId={activeSocketId}
          onSocketSelect={handleSocketSelect}
          onSocketClear={clearSocket}
        />
        <BuildGearStage
          gear={gear}
          effects={effects}
          detailItem={detailItem}
          inBuild={inBuild}
          typeFilter={typeFilter}
          onTypeFilterChange={handleTypeFilterChange}
          rarityFilter={rarityFilter}
          onRarityFilterChange={setRarityFilter}
          selectedSlug={selectedSlug}
          onItemSelect={(item) => {
            rememberCatalogScroll()
            selectSlug(item.slug)
            setShowDetails(true)
          }}
          query={query}
          onQueryChange={setQuery}
          onSearchClear={() => {
            setActiveSocketId(null)
            clearSlug()
          }}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onBack={() => {
            setActiveSocketId(null)
            setShowDetails(false)
            clearSlug()
          }}
        />
      </div>
    </div>
  )
}
