import type { EnchantmentGearType } from '#/types/data/enchantment'
import type { GearType } from '#/types/data/gear'

const gearTypeLabels = {
  melee_weapon: 'Melee weapon',
  ranged_weapon: 'Ranged weapon',
  armor: 'Armor',
  armor_helmet: 'Helmet',
  armor_chest: 'Chestplate',
  armor_leggings: 'Leggings',
  armor_boots: 'Boots',
  artifact: 'Artifact',
  talisman: 'Talisman',
} satisfies Record<GearType | EnchantmentGearType, string>

export function formatGearType(type: GearType | EnchantmentGearType): string {
  return gearTypeLabels[type]
}
