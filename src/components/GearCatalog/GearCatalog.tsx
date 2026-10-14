import { useState, type ReactNode } from 'react'
import { Catalog } from '#/components/Catalog'
import { useFavourites } from '#/components/FavouritesProvider'
import { Checkbox } from '#/components/ui/Checkbox'
import { useSearchSettings } from '#/hooks/useSearchSettings'
import { filterGear, gearExtraSearchText } from '#/lib/catalog/filter-gear'
import { gearCatalogGroups } from '#/lib/catalog/group-gear-by-set'
import { sortGear } from '#/lib/catalog/sort-gear'
import { GEAR_TYPES, type Gear, type GearRarityFilter, type GearType } from '#/types/data/gear'
import type { Effect } from '#/types/data/effect'
import { GearCatalogRarityFilters } from './GearCatalogRarityFilters'
import { GearCatalogSearchFields } from './GearCatalogSearchFields'
import { GearCatalogSearchToggle } from './GearCatalogSearchToggle'
import { GearCatalogTypeFilters } from './GearCatalogTypeFilters'
import styles from './GearCatalog.module.css'

export type GearCatalogProps = {
  gear: Array<Gear>
  effects?: Array<Effect>
  typeFilter: GearType | null
  onTypeFilterChange: (type: GearType | null) => void
  rarityFilter: GearRarityFilter | null
  onRarityFilterChange: (rarity: GearRarityFilter | null) => void
  selectedSlug: string | null
  onItemSelect: (item: Gear) => void
  onItemAdd?: (item: Gear) => void
  query: string
  onQueryChange: (query: string) => void
  onSearchClear?: () => void
  leading?: ReactNode
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
  onItemAdd,
  query,
  onQueryChange,
  onSearchClear,
  leading,
}: GearCatalogProps) {
  const { isFavourite } = useFavourites()
  const { groupBySet, setGroupBySet } = useSearchSettings()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [effectQuery, setEffectQuery] = useState('')
  const [archetypeQuery, setArchetypeQuery] = useState('')
  const items = sortGear(
    filterGear(gear, {
      query: '',
      effectQuery,
      archetypeQuery,
      type: typeFilter,
      rarity: rarityFilter,
      effects,
    }),
    isFavourite,
  )
  const groups = gearCatalogGroups(groupBySet && query.trim().length > 0, items, gear)

  return (
    <Catalog
      items={groups.items}
      catalogKind="gear"
      selectedSlug={selectedSlug}
      onItemSelect={onItemSelect}
      onItemAdd={onItemAdd}
      ariaLabel="Gear catalog"
      searchPlaceholder="Search gear"
      searchLabel="Search gear"
      emptyFiltered="No gear matches that search."
      emptyCatalog="No gear in the catalog yet."
      extraSearchText={gearExtraSearchText}
      query={query}
      onQueryChange={onQueryChange}
      onSearchClear={onSearchClear}
      leading={leading}
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
      groupBy={groups.groupBy}
      groupLabel={groups.groupLabel}
      groupOrder={groups.groupOrder}
      hideBanner={groups.hideBanner}
      toolbar={
        <div className={styles.filters}>
          <GearCatalogTypeFilters
            inline
            value={typeFilter}
            types={GEAR_TYPES}
            onChange={onTypeFilterChange}
          />
          <GearCatalogRarityFilters inline value={rarityFilter} onChange={onRarityFilterChange} />
          <Checkbox label="Group by set" checked={groupBySet} onChange={setGroupBySet} />
        </div>
      }
    />
  )
}
