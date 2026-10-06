import { effectsForGear, uniqueEffectForGear } from '#/lib/catalog/filter-effects'
import { filterCatalogItems } from '#/lib/catalog/filter-catalog-items'
import type { Effect } from '#/types/data/effect'
import type { Gear, GearRarity, GearType } from '#/types/data/gear'

export type FilterGearOptions = {
  query: string
  effectQuery?: string
  archetypeQuery?: string
  type?: GearType | null
  rarity?: GearRarity | null
  effects?: Array<Effect>
}

function matchesText(values: Array<string | null | undefined>, query: string): boolean {
  const needle = query.trim().toLowerCase()

  if (!needle) {
    return true
  }

  return values.some((value) => value?.toLowerCase().includes(needle))
}

function effectNames(item: Gear, effects: Array<Effect>): Array<string> {
  const unique = uniqueEffectForGear(effects, item.slug)
  const names = effectsForGear(effects, item).map((effect) => effect.name)

  return unique ? [...names, unique.name] : names
}

export function filterGear(gear: Array<Gear>, options: FilterGearOptions): Array<Gear> {
  const type = options.type ?? null
  const rarity = options.rarity ?? null
  const effects = options.effects ?? []
  const matched = gear.filter(
    (item) =>
      (!type || item.type === type) &&
      (!rarity || item.rarity.includes(rarity)) &&
      matchesText(effectNames(item, effects), options.effectQuery ?? '') &&
      matchesText(item.archetypeNames, options.archetypeQuery ?? ''),
  )

  return filterCatalogItems(matched, options.query)
}
