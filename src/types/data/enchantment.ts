export const ENCHANTMENT_GEAR_TYPES = [
  'melee_weapon',
  'ranged_weapon',
  'armor',
  'artifact',
  'talisman',
] as const

export type EnchantmentGearType = (typeof ENCHANTMENT_GEAR_TYPES)[number]

export type EnchantmentTier = {
  label: string
  text: string
}

export type GearEnchantment = {
  slug: string
  name: string
  description: string
  tiers: Array<EnchantmentTier>
}

export type Enchantment = {
  slug: string
  name: string
  description: string
  gearTypes: Array<EnchantmentGearType>
  tiers: Array<EnchantmentTier>
  categories: Array<string>
  sources: Array<string>
}
