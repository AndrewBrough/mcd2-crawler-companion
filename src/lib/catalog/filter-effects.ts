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
  gear: { slug: string; effectSlugs: Array<string> },
): Array<Effect> {
  const unique = uniqueEffectForGear(effects, gear.slug)
  const allowed = new Set(gear.effectSlugs)

  return effects.filter((effect) => allowed.has(effect.slug) && effect.slug !== unique?.slug)
}
