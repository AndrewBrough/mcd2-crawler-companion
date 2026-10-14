import { useEffect, useRef, useState } from 'react'
import type { BuildSearch } from '#/lib/build/build-search'
import { targetSocketId } from '#/lib/build/target-socket'
import { useBuildLoadout } from '#/lib/build/use-build-loadout'
import { useBuildName } from '#/lib/build/use-build-name'
import { useSaveBuild } from '#/lib/build/use-save-build'
import { useCatalogSlug } from '#/lib/catalog/use-catalog-slug'
import { BUILD_SOCKET_ROWS, type BuildLoadout, type BuildSocketDefinition } from '#/types/data/build'
import type { Effect } from '#/types/data/effect'
import type { Gear, GearRarityFilter, GearType } from '#/types/data/gear'
import { Layout, useNarrowViewport, type LayoutMobilePanel } from '#/components/ui/Layout'
import { BuildGearStage } from './BuildGearStage/BuildGearStage'
import { BuildLoadoutPanel } from './BuildLoadoutPanel'
import { usePreserveCatalogScroll } from './use-preserve-catalog-scroll'

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
  const [rarityFilter, setRarityFilter] = useState<GearRarityFilter | null>(null)
  const [activeSocketId, setActiveSocketId] = useState<string | null>(() =>
    socketIdForSlug(loadout, search.slug),
  )
  const retainSocket = useRef(false)

  useEffect(() => {
    if (search.slug) {
      const item = gear.find((entry) => entry.slug === search.slug)
      setActiveSocketId((current) => {
        if (item && current && socketKind(current) === item.type) {
          return current
        }
        return socketIdForSlug(loadout, search.slug) ?? current
      })
      return
    }

    if (retainSocket.current) {
      retainSocket.current = false
      return
    }

    setActiveSocketId(null)
  }, [gear, loadout, search.slug])
  const [showDetails, setShowDetails] = useState(() =>
    gear.some((item) => item.slug === search.slug),
  )
  const [mobilePanel, setMobilePanel] = useState<'build' | 'catalog' | 'details'>('build')
  const isNarrow = useNarrowViewport()

  useEffect(() => {
    if (!search.slug || mobilePanel === 'catalog') {
      return
    }
    if (gear.some((item) => item.slug === search.slug)) {
      setShowDetails(true)
    }
  }, [gear, mobilePanel, search.slug])
  const rememberCatalogScroll = usePreserveCatalogScroll(!showDetails)
  const inspected = gear.find((item) => item.slug === selectedSlug) ?? null
  const detailItem = showDetails ? inspected : null
  const inBuild = Boolean(
    detailItem &&
      (activeSocketId
        ? loadout[activeSocketId]?.slug === detailItem.slug
        : Object.values(loadout).some((item) => item.slug === detailItem.slug)),
  )

  function handleSocketSelect(socket: BuildSocketDefinition) {
    if (socket.id === activeSocketId && !isNarrow) {
      setActiveSocketId(null)
      setTypeFilter(null)
      setShowDetails(false)
      setMobilePanel('build')
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
      setMobilePanel('details')
      return
    }

    setMobilePanel('catalog')
    if (isNarrow) {
      setShowDetails(false)
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
    setActiveSocketId(socketId)
    equip(socketId, detailItem)
  }

  function handleQuickAdd(item: Gear) {
    const socketId = targetSocketId(loadout, activeSocketId, item)
    if (!socketId) return
    equip(socketId, item, null)
  }

  function handleRemove() {
    if (!detailItem) return
    if (activeSocketId && loadout[activeSocketId]?.slug === detailItem.slug) {
      clearSocket(activeSocketId)
      return
    }
    removeSlug(detailItem.slug)
    setActiveSocketId(null)
  }

  const layoutPanel: LayoutMobilePanel = mobilePanel === 'build' ? 'primary' : 'secondary'
  const showCatalog = isNarrow ? mobilePanel === 'catalog' : detailItem === null

  return (
    <Layout columns="sidebar" mobilePanel={layoutPanel}>
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
        search={search}
        loadout={loadout}
        activeSocketId={activeSocketId}
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
          setMobilePanel('details')
        }}
        query={query}
        onQueryChange={setQuery}
        onSearchClear={() => {
          setActiveSocketId(null)
          clearSlug()
        }}
        onAdd={handleAdd}
        onQuickAdd={handleQuickAdd}
        onRemove={handleRemove}
        showCatalog={showCatalog}
        onCatalogBack={() => setMobilePanel('build')}
        onBack={() => {
          setShowDetails(false)
          setMobilePanel('catalog')
          if (isNarrow) {
            retainSocket.current = true
          } else {
            setActiveSocketId(null)
          }
          clearSlug()
        }}
      />
    </Layout>
  )
}
