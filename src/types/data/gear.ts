import type { DropRateEntry, NamedRef } from './drop-rate'

export const GEAR_TYPES = [
  'melee_weapon',
  'ranged_weapon',
  'armor',
  'artifact',
  'talisman',
] as const

export type GearType = (typeof GEAR_TYPES)[number]

export type Gear = {
  slug: string
  name: string
  description: string
  type: GearType
  enchantments: Array<NamedRef>
}

export type GearListItem = Gear & {
  locationSources: Array<DropRateEntry>
  enemySources: Array<DropRateEntry>
}
