import type { Effect } from '#/types/data/effect'
import type { GearType } from '#/types/data/gear'

const effectSlugsByGearType = {
  melee_weapon: ['melee'],
  ranged_weapon: ['bow', 'crossbow', 'quiver'],
  armor_helmet: ['armor'],
  armor_chest: ['armor'],
  armor_leggings: ['armor'],
  armor_boots: ['armor'],
  artifact: ['artifact'],
  talisman: ['talisman'],
} satisfies Record<GearType, ReadonlyArray<string>>

export function filterEffects(effects: Array<Effect>, type: GearType | null): Array<Effect> {
  if (!type) {
    return effects
  }

  const slugs = effectSlugsByGearType[type]

  return effects.filter((effect) => effect.gearSlugs.some((slug) => slugs.includes(slug)))
}

export function uniqueEffectForGear(effects: Array<Effect>, slug: string): Effect | null {
  return effects.find((effect) => effect.uniqueGear.some((item) => item.slug === slug)) ?? null
}

export function effectsForGear(
  effects: Array<Effect>,
  gear: { type: GearType; slug: string },
): Array<Effect> {
  const typeSlugs = effectSlugsByGearType[gear.type]
  const unique = uniqueEffectForGear(effects, gear.slug)

  return effects.filter((effect) => {
    if (unique && effect.slug === unique.slug) {
      return false
    }

    return effect.gearSlugs.some((slug) => typeSlugs.includes(slug))
  })
}
