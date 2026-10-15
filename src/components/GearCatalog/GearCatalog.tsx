import { useState, type ReactNode } from 'react'
import { Catalog } from '#/components/Catalog'
import { useFavourites } from '#/components/FavouritesProvider'
import { filterGear, gearExtraSearchText } from '#/lib/catalog/filter-gear'
import { formatGearType } from '#/lib/catalog/format-gear-type'
import { sortGear } from '#/lib/catalog/sort-gear'
import type { Archetype } from '#/types/data/archetype'
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
  archetypes?: Array<Archetype>
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
  archetypes = [],
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
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [descriptionQuery, setDescriptionQuery] = useState('')
  const [effectQuery, setEffectQuery] = useState('')
  const [archetypeSlug, setArchetypeSlug] = useState<string | null>(null)
  const archetypeName = archetypes.find((item) => item.slug === archetypeSlug)?.name
  const items = sortGear(
    filterGear(gear, {
      query: '',
      descriptionQuery,
      effectQuery,
      archetypeName,
      type: typeFilter,
      rarity: rarityFilter,
      effects,
    }),
    isFavourite,
    gear,
  )

  return (
    <Catalog
      items={items}
      catalogKind="gear"
      selectedSlug={selectedSlug}
      onItemSelect={onItemSelect}
      onItemAdd={onItemAdd}
      ariaLabel="Gear catalog"
      searchPlaceholder="Search gear or set name"
      searchLabel="Search gear or set name"
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
            descriptionQuery={descriptionQuery}
            onDescriptionQueryChange={setDescriptionQuery}
            effectQuery={effectQuery}
            onEffectQueryChange={setEffectQuery}
            archetypes={archetypes}
            archetypeSlug={archetypeSlug}
            onArchetypeChange={setArchetypeSlug}
          />
        ) : null
      }
      groupBy={(item) => item.type}
      groupLabel={(group) => formatGearType(group as GearType)}
      groupOrder={GEAR_TYPES}
      toolbar={
        <div className={styles.filters}>
          <GearCatalogTypeFilters
            inline
            value={typeFilter}
            types={GEAR_TYPES}
            onChange={onTypeFilterChange}
          />
          <GearCatalogRarityFilters inline value={rarityFilter} onChange={onRarityFilterChange} />
        </div>
      }
    />
  )
}
