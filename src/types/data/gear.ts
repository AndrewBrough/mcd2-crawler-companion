import type { DropRateEntry, NamedRef } from './drop-rate'

export const GEAR_TYPES = [
  'melee_weapon',
  'ranged_weapon',
  'armor_helmet',
  'armor_chest',
  'armor_leggings',
  'armor_boots',
  'artifact',
  'talisman',
] as const

export type GearType = (typeof GEAR_TYPES)[number]

export const GEAR_RARITIES = ['common', 'rare', 'special', 'unique'] as const

export type GearRarity = (typeof GEAR_RARITIES)[number]

export type Gear = {
  slug: string
  name: string
  description: string
  type: GearType
  rarity: Array<GearRarity>
  enchantments: Array<NamedRef>
  effectSlugs: Array<string>
}

export type GearListItem = Gear & {
  locationSources: Array<DropRateEntry>
  enemySources: Array<DropRateEntry>
}
