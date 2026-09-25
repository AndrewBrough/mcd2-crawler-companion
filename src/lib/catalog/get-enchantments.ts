import { supabase } from '#/lib/supabase/client'
import { CatalogQueryError } from '#/lib/catalog/query-error'
import { GEAR_TYPES, type GearType } from '#/types/data/gear'
import type { Enchantment } from '#/types/data/enchantment'

type EnchantmentQueryRow = {
  slug: string
  name: string
  description: string
  gear_type: string
}

function parseGearType(value: string): GearType | null {
  return GEAR_TYPES.find((type) => type === value) ?? null
}

export async function getEnchantments(): Promise<Array<Enchantment>> {
  const { data, error } = await supabase
    .from('enchantments')
    .select('slug, name, description, gear_type')
    .order('name')

  if (error) {
    throw new CatalogQueryError(error.message)
  }

  return ((data ?? []) as Array<EnchantmentQueryRow>).flatMap((row) => {
    const gearType = parseGearType(row.gear_type)

    if (!gearType) {
      return []
    }

    return [
      {
        slug: row.slug,
        name: row.name,
        description: row.description,
        gearType,
      },
    ]
  })
}
