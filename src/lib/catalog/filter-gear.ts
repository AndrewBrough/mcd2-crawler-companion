import { formatGearType } from '#/lib/catalog/format-gear-type'
import type { Gear, GearType } from '#/types/data/gear'

export type FilterGearOptions = {
  query: string
  type?: GearType | null
}

export function filterGear(gear: Array<Gear>, options: FilterGearOptions): Array<Gear> {
  const needle = options.query.trim().toLowerCase()
  const type = options.type ?? null

  return gear.filter((item) => {
    if (type && item.type !== type) {
      return false
    }

    if (!needle) {
      return true
    }

    return (
      item.name.toLowerCase().includes(needle) ||
      item.slug.toLowerCase().includes(needle) ||
      formatGearType(item.type).toLowerCase().includes(needle)
    )
  })
}
