import { formatGearType } from '#/lib/catalog/format-gear-type'
import { filterCatalogItems } from '#/lib/catalog/filter-catalog-items'
import type { Gear, GearType } from '#/types/data/gear'

export type FilterGearOptions = {
  query: string
  type?: GearType | null
}

export function filterGear(gear: Array<Gear>, options: FilterGearOptions): Array<Gear> {
  const type = options.type ?? null
  const typed = type ? gear.filter((item) => item.type === type) : gear

  return filterCatalogItems(typed, options.query, (item) => [formatGearType(item.type)])
}
