import { Catalog } from '#/components/Catalog'
import { GearCatalogTypeFilters } from '#/components/GearCatalog/GearCatalogTypeFilters'
import { filterEffects } from '#/lib/catalog/filter-effects'
import { formatEffectGearSlug } from '#/lib/catalog/format-effect-gear-slug'
import type { Effect } from '#/types/data/effect'
import { GEAR_TYPES, type GearType } from '#/types/data/gear'

export type EffectsCatalogProps = {
  effects: Array<Effect>
  typeFilter: GearType | null
  onTypeFilterChange: (type: GearType | null) => void
  selectedSlug: string | null
  onItemSelect: (item: Effect) => void
  query: string
  onQueryChange: (query: string) => void
}

export function EffectsCatalog({
  effects,
  typeFilter,
  onTypeFilterChange,
  selectedSlug,
  onItemSelect,
  query,
  onQueryChange,
}: EffectsCatalogProps) {
  const items = filterEffects(effects, typeFilter)

  return (
    <Catalog
      items={items}
      catalogKind="effects"
      selectedSlug={selectedSlug}
      onItemSelect={onItemSelect}
      ariaLabel="Effects catalog"
      searchPlaceholder="Search effects"
      searchLabel="Search effects"
      emptyFiltered="No effects match that search."
      emptyCatalog="No effects in the catalog yet."
      extraSearchText={(item) => [
        item.description,
        ...item.gearSlugs.map(formatEffectGearSlug),
        ...item.uniqueGear.map((gear) => gear.name),
      ]}
      query={query}
      onQueryChange={onQueryChange}
      toolbar={
        <GearCatalogTypeFilters
          value={typeFilter}
          types={GEAR_TYPES}
          onChange={onTypeFilterChange}
        />
      }
    />
  )
}
