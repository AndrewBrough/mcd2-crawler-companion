import { useState } from 'react'
import { CatalogBrowsePage } from '#/components/CatalogBrowsePage'
import { GearCatalog } from '#/components/GearCatalog'
import type { Gear, GearListItem, GearRarity, GearType } from '#/types/data/gear'
import { GearDetailPanel } from './GearDetailPanel'

export type GearPageProps = {
  gear: Array<GearListItem>
}

export function GearPage({ gear }: GearPageProps) {
  const [typeFilter, setTypeFilter] = useState<GearType | null>(null)
  const [rarityFilter, setRarityFilter] = useState<GearRarity | null>(null)
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const selected = gear.find((item) => item.slug === selectedSlug) ?? null

  function handleItemSelect(item: Gear) {
    setSelectedSlug(item.slug)
  }

  return (
    <CatalogBrowsePage
      kicker="Loot"
      title="Gear"
      description="Browse the catalog and inspect a piece of gear."
      catalog={
        <GearCatalog
          gear={gear}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          rarityFilter={rarityFilter}
          onRarityFilterChange={setRarityFilter}
          selectedSlug={selectedSlug}
          onItemSelect={handleItemSelect}
        />
      }
      detail={<GearDetailPanel item={selected} />}
    />
  )
}
