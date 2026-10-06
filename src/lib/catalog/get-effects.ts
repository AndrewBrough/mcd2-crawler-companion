import { supabase } from '#/lib/supabase/client'
import { CatalogQueryError } from '#/lib/catalog/query-error'
import type { Effect, EffectGearRef, EffectLevel } from '#/types/data/effect'

type EffectQueryRow = {
  name: string
  slug: string
  description: string
  gear_slugs: Array<string> | null
  unique_bound: Array<string> | null
  level_1: number | string | null
  level_2: number | string | null
  level_3: number | string | null
  unique_level: number | string | null
}

function percent(value: number | string | null): number | null {
  if (value === null || value === '') {
    return null
  }

  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function levels(row: EffectQueryRow): Array<EffectLevel> {
  const tiers: Array<[string, number | string | null]> = [
    ['I', row.level_1],
    ['II', row.level_2],
    ['III', row.level_3],
    ['Unique', row.unique_level],
  ]

  return tiers.flatMap(([label, value]) => {
    const amount = percent(value)
    return amount === null ? [] : [{ label, percent: amount }]
  })
}

function availableGear(slug: string, names: Map<string, string>): EffectGearRef | null {
  const name = names.get(slug)

  return name ? { slug, name } : null
}

export async function getEffects(): Promise<Array<Effect>> {
  const [effectsResult, gearResult] = await Promise.all([
    supabase
      .from('effects')
      .select('name, slug, description, gear_slugs, unique_bound, level_1, level_2, level_3, unique_level')
      .order('name'),
    supabase.from('gear').select('slug, name'),
  ])

  if (effectsResult.error) {
    throw new CatalogQueryError(effectsResult.error.message)
  }

  const names = new Map((gearResult.data ?? []).map((item) => [item.slug, item.name]))

  return ((effectsResult.data ?? []) as Array<EffectQueryRow>).map((row) => ({
    name: row.name,
    slug: row.slug,
    description: row.description,
    gearSlugs: row.gear_slugs ?? [],
    levels: levels(row),
    uniqueGear: (row.unique_bound ?? []).flatMap((slug) => {
      const gear = availableGear(slug, names)
      return gear ? [gear] : []
    }),
  }))
}
