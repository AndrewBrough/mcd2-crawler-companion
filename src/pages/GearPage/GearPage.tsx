import { useState } from 'react'
import { CatalogBrowsePage } from '#/components/CatalogBrowsePage'
import { GearCatalog } from '#/components/GearCatalog'
import { PanelBack } from '#/components/ui/PanelBack'
import { useCatalogSlug } from '#/lib/catalog/use-catalog-slug'
import type { Archetype } from '#/types/data/archetype'
import type { Effect } from '#/types/data/effect'
import type { Gear, GearListItem, GearRarityFilter, GearType } from '#/types/data/gear'
import { GearDetailPanel } from './GearDetailPanel'

export type GearPageProps = {
  gear: Array<GearListItem>
  effects: Array<Effect>
  archetypes: Array<Archetype>
  initialSlug?: string | null
}

export function GearPage({ gear, effects, archetypes, initialSlug = null }: GearPageProps) {
  const [typeFilter, setTypeFilter] = useState<GearType | null>(null)
  const [rarityFilter, setRarityFilter] = useState<GearRarityFilter | null>(null)
  const { selectedSlug, selectSlug, clearSlug, query, setQuery } = useCatalogSlug(initialSlug)
  const selected = gear.find((item) => item.slug === selectedSlug) ?? null

  function handleItemSelect(item: Gear) {
    selectSlug(item.slug)
  }

  return (
    <CatalogBrowsePage
      title="Gear"
      description="Browse the catalog and inspect a piece of gear."
      detailOpen={selected !== null}
      catalog={
        <GearCatalog
          gear={gear}
          effects={effects}
          archetypes={archetypes}
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
          gear={gear}
          effects={effects}
          header={<PanelBack onClick={clearSlug} />}
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
