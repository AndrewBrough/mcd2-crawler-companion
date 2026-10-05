import { supabase } from '#/lib/supabase/client'
import { CatalogQueryError } from '#/lib/catalog/query-error'
import {
  ENCHANTMENT_GEAR_TYPES,
  type Enchantment,
  type EnchantmentGearType,
  type EnchantmentTier,
} from '#/types/data/enchantment'

type EnchantmentQueryRow = {
  slug: string
  name: string
  description: string
  gear_types: Array<string>
  tier_1: string
  tier_2: string
  tier_3: string
  categories: Array<string>
  sources: Array<string>
}

function parseGearTypes(values: Array<string>): Array<EnchantmentGearType> {
  return values.flatMap((value) => {
    const match = ENCHANTMENT_GEAR_TYPES.find((type) => type === value)
    return match ? [match] : []
  })
}

function tiers(row: EnchantmentQueryRow): Array<EnchantmentTier> {
  return [
    { label: 'I', text: row.tier_1 },
    { label: 'II', text: row.tier_2 },
    { label: 'III', text: row.tier_3 },
  ].filter((tier) => tier.text)
}

export async function getEnchantments(): Promise<Array<Enchantment>> {
  const { data, error } = await supabase
    .from('enchantments')
    .select('slug, name, description, gear_types, tier_1, tier_2, tier_3, categories, sources')
    .order('name')

  if (error) {
    throw new CatalogQueryError(error.message)
  }

  return ((data ?? []) as Array<EnchantmentQueryRow>).flatMap((row) => {
    const gearTypes = parseGearTypes(row.gear_types)

    if (!gearTypes.length) {
      return []
    }

    return [
      {
        slug: row.slug,
        name: row.name,
        description: row.description,
        gearTypes,
        tiers: tiers(row),
        categories: row.categories,
        sources: row.sources,
      },
    ]
  })
}
