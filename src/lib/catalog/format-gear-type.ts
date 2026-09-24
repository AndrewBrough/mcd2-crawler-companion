import type { GearType } from '#/types/data/gear'

const gearTypeLabels: Record<GearType, string> = {
  melee_weapon: 'Melee weapon',
  ranged_weapon: 'Ranged weapon',
  armor: 'Armor',
  artifact: 'Artifact',
  talisman: 'Talisman',
}

export function formatGearType(type: GearType): string {
  return gearTypeLabels[type]
}
