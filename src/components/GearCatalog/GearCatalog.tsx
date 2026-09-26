import { Catalog } from '#/components/Catalog'
import { filterGear } from '#/lib/catalog/filter-gear'
import { formatGearType } from '#/lib/catalog/format-gear-type'
import { GEAR_RARITIES, GEAR_TYPES, type Gear, type GearRarity, type GearType } from '#/types/data/gear'
import { GearCatalogRarityFilters } from './GearCatalogRarityFilters'
import { GearCatalogTypeFilters } from './GearCatalogTypeFilters'

export type GearCatalogProps = {
  gear: Array<Gear>
  typeFilter: GearType | null
  onTypeFilterChange: (type: GearType | null) => void
  rarityFilter: GearRarity | null
  onRarityFilterChange: (rarity: GearRarity | null) => void
  selectedSlug: string | null
  onItemSelect: (item: Gear) => void
}

export function GearCatalog({
  gear,
  typeFilter,
  onTypeFilterChange,
  rarityFilter,
  onRarityFilterChange,
  selectedSlug,
  onItemSelect,
}: GearCatalogProps) {
  const items = filterGear(gear, { query: '', type: typeFilter, rarity: rarityFilter })

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
