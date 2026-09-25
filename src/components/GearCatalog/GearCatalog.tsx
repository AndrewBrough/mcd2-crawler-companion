import { Catalog } from '#/components/Catalog'
import { filterGear } from '#/lib/catalog/filter-gear'
import { formatGearType } from '#/lib/catalog/format-gear-type'
import { GEAR_TYPES, type Gear, type GearType } from '#/types/data/gear'
import { GearCatalogFilters } from './GearCatalogFilters'
import { GearCatalogTypeSelect } from './GearCatalogTypeSelect'

export type GearCatalogProps = {
  gear: Array<Gear>
  typeFilter: GearType | null
  onTypeFilterChange: (type: GearType | null) => void
  selectedSlug: string | null
  onItemSelect: (item: Gear) => void
}

export function GearCatalog({
  gear,
  typeFilter,
  onTypeFilterChange,
  selectedSlug,
  onItemSelect,
}: GearCatalogProps) {
  const items = filterGear(gear, { query: '', type: typeFilter })

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
      extraSearchText={(item) => [formatGearType(item.type)]}
      toolbar={
        <GearCatalogTypeSelect
          value={typeFilter}
          types={GEAR_TYPES}
          onChange={onTypeFilterChange}
        />
      }
      filters={
        <GearCatalogFilters
          type={typeFilter}
          onRemoveType={() => onTypeFilterChange(null)}
        />
      }
    />
  )
}
