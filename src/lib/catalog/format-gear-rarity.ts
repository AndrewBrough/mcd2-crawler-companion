import type { GearRarity } from '#/types/data/gear'

const gearRarityLabels = {
  common: 'Common',
  rare: 'Rare',
  special: 'Special',
  unique: 'Unique',
} satisfies Record<GearRarity, string>

export function formatGearRarity(rarity: GearRarity): string {
  return gearRarityLabels[rarity]
}
