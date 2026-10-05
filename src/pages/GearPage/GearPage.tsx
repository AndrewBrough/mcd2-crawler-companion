import { useState } from 'react'
import { CatalogBrowsePage } from '#/components/CatalogBrowsePage'
import { GearCatalog } from '#/components/GearCatalog'
import { useCatalogSlug } from '#/lib/catalog/use-catalog-slug'
import type { Effect } from '#/types/data/effect'
import type { Gear, GearListItem, GearRarity, GearType } from '#/types/data/gear'
import { GearDetailPanel } from './GearDetailPanel'

export type GearPageProps = {
  gear: Array<GearListItem>
  effects: Array<Effect>
  initialSlug?: string | null
}

export function GearPage({ gear, effects, initialSlug = null }: GearPageProps) {
  const [typeFilter, setTypeFilter] = useState<GearType | null>(null)
  const [rarityFilter, setRarityFilter] = useState<GearRarity | null>(null)
  const { selectedSlug, selectSlug, query, setQuery } = useCatalogSlug(initialSlug)
  const selected = gear.find((item) => item.slug === selectedSlug) ?? null

  function handleItemSelect(item: Gear) {
    selectSlug(item.slug)
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
          query={query}
          onQueryChange={setQuery}
        />
      }
      detail={
        <GearDetailPanel
          item={selected}
          effects={effects}
          onVariantSelect={(slug) => {
            const variant = gear.find((entry) => entry.slug === slug)
            if (variant) {
              handleItemSelect(variant)
            }
          }}
        />
      }
    />
  )
}
