export const ENCHANTMENT_GEAR_TYPES = [
  'melee_weapon',
  'ranged_weapon',
  'armor',
  'artifact',
  'talisman',
] as const

export type EnchantmentGearType = (typeof ENCHANTMENT_GEAR_TYPES)[number]

export type Enchantment = {
  slug: string
  name: string
  description: string
  gearType: EnchantmentGearType
}
