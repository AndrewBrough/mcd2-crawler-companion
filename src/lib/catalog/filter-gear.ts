import { formatGearRarity } from '#/lib/catalog/format-gear-rarity'
import { formatGearType } from '#/lib/catalog/format-gear-type'
import { filterCatalogItems } from '#/lib/catalog/filter-catalog-items'
import type { Gear, GearRarity, GearType } from '#/types/data/gear'

export type FilterGearOptions = {
  query: string
  type?: GearType | null
  rarity?: GearRarity | null
}

export function filterGear(gear: Array<Gear>, options: FilterGearOptions): Array<Gear> {
  const type = options.type ?? null
  const rarity = options.rarity ?? null
  const matched = gear.filter(
    (item) => (!type || item.type === type) && (!rarity || item.rarity === rarity),
  )

  return filterCatalogItems(matched, options.query, (item) => [
    formatGearType(item.type),
    formatGearRarity(item.rarity),
  ])
}
