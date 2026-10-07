import { CatalogQueryError } from '#/lib/catalog/query-error'
import { supabase } from '#/lib/supabase/client'
import type { GearRarity, GearType } from '#/types/data/gear'

type NumericCell = number | string | null

type SetDpsRow = {
  slug: string
  base_dps: NumericCell
}

type UniqueDpsRow = {
  slug: string
  base_dps: NumericCell
}

export type MeleeBaseDps = {
  bySetId: Map<string, number>
  byUniqueSlug: Map<string, number>
}

function toNumber(value: NumericCell): number | null {
  if (value == null) {
    return null
  }

  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export async function getMeleeBaseDps(): Promise<MeleeBaseDps> {
  const [setResult, uniqueResult] = await Promise.all([
    supabase.from('weapon_dps').select('slug, base_dps'),
    supabase.from('unique_weapon_dps').select('slug, base_dps'),
  ])

  if (setResult.error) {
    throw new CatalogQueryError(setResult.error.message)
  }

  if (uniqueResult.error) {
    throw new CatalogQueryError(uniqueResult.error.message)
  }

  const bySetId = new Map<string, number>()
  for (const row of (setResult.data ?? []) as Array<SetDpsRow>) {
    const value = toNumber(row.base_dps)
    if (value != null) {
      bySetId.set(row.slug, value)
    }
  }

  const byUniqueSlug = new Map<string, number>()
  for (const row of (uniqueResult.data ?? []) as Array<UniqueDpsRow>) {
    const value = toNumber(row.base_dps)
    if (value != null) {
      byUniqueSlug.set(row.slug, value)
    }
  }

  return { bySetId, byUniqueSlug }
}

export function meleeBaseDps(
  gear: {
    type: GearType
    slug: string
    setId: string | null
    rarity: Array<GearRarity>
  },
  dps: MeleeBaseDps,
): number | null {
  if (gear.type !== 'melee_weapon') {
    return null
  }

  if (gear.rarity.includes('unique')) {
    const override = dps.byUniqueSlug.get(gear.slug)
    if (override != null) {
      return override
    }
  }

  return gear.setId ? (dps.bySetId.get(gear.setId) ?? null) : null
}
