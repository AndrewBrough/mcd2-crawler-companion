import type { GearRarity } from '#/types/data/gear'

const gearRarityLabels = {
  regular: 'Regular',
  unique: 'Unique',
} satisfies Record<GearRarity, string>

export function formatGearRarity(rarity: GearRarity): string {
  return gearRarityLabels[rarity]
}
