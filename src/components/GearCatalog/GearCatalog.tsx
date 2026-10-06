import { useState } from 'react'
import { Catalog } from '#/components/Catalog'
import { filterGear } from '#/lib/catalog/filter-gear'
import { GEAR_RARITIES, GEAR_TYPES, type Gear, type GearRarity, type GearType } from '#/types/data/gear'
import type { Effect } from '#/types/data/effect'
import { GearCatalogRarityFilters } from './GearCatalogRarityFilters'
import { GearCatalogSearchFields } from './GearCatalogSearchFields'
import { GearCatalogSearchToggle } from './GearCatalogSearchToggle'
import { GearCatalogTypeFilters } from './GearCatalogTypeFilters'

export type GearCatalogProps = {
  gear: Array<Gear>
  effects?: Array<Effect>
  typeFilter: GearType | null
  onTypeFilterChange: (type: GearType | null) => void
  rarityFilter: GearRarity | null
  onRarityFilterChange: (rarity: GearRarity | null) => void
  selectedSlug: string | null
  onItemSelect: (item: Gear) => void
  query: string
  onQueryChange: (query: string) => void
  onSearchClear?: () => void
}

export function GearCatalog({
  gear,
  effects = [],
  typeFilter,
  onTypeFilterChange,
  rarityFilter,
  onRarityFilterChange,
  selectedSlug,
  onItemSelect,
  query,
  onQueryChange,
  onSearchClear,
}: GearCatalogProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [effectQuery, setEffectQuery] = useState('')
  const [archetypeQuery, setArchetypeQuery] = useState('')
  const items = filterGear(gear, {
    query: '',
    effectQuery,
    archetypeQuery,
    type: typeFilter,
    rarity: rarityFilter,
    effects,
  })

  return (
    <Catalog
      items={items}
      catalogKind="gear"
      selectedSlug={selectedSlug}
      onItemSelect={onItemSelect}
      ariaLabel="Gear catalog"
      searchPlaceholder="Search gear"
      searchLabel="Search gear"
      emptyFiltered="No gear matches that search."
      emptyCatalog="No gear in the catalog yet."
      query={query}
      onQueryChange={onQueryChange}
      onSearchClear={onSearchClear}
      searchAccessory={
        <GearCatalogSearchToggle open={filtersOpen} onToggle={() => setFiltersOpen((open) => !open)} />
      }
      searchDetails={
        filtersOpen ? (
          <GearCatalogSearchFields
            effectQuery={effectQuery}
            onEffectQueryChange={setEffectQuery}
            archetypeQuery={archetypeQuery}
            onArchetypeQueryChange={setArchetypeQuery}
          />
        ) : null
      }
      limitResults
      toolbar={
        <>
          <GearCatalogTypeFilters
            value={typeFilter}
            types={GEAR_TYPES}
            onChange={onTypeFilterChange}
          />
          <GearCatalogRarityFilters
            value={rarityFilter}
            rarities={GEAR_RARITIES}
            onChange={onRarityFilterChange}
          />
        </>
      }
    />
  )
}
