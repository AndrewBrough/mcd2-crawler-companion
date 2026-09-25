import { supabase } from '#/lib/supabase/client'
import { compactMap, mapDrop, mapNamedRef, type NamedEmbed } from '#/lib/catalog/map-drop'
import { CatalogQueryError } from '#/lib/catalog/query-error'
import { GEAR_RARITIES, type GearListItem } from '#/types/data/gear'

type GearQueryRow = {
  name: string
  slug: string
  description: string
  rarity: string
  type: GearListItem['type']
  gear_enchantments: Array<{ enchantment: NamedEmbed }> | null
  location_gear_drops: Array<{ drop_rate: number | string; location: NamedEmbed }> | null
  enemy_gear_drops: Array<{ drop_rate: number | string; enemy: NamedEmbed }> | null
}

export async function getGear(): Promise<Array<GearListItem>> {
  const { data, error } = await supabase
    .from('gear')
    .select(
      `
        name,
        slug,
        description,
        rarity,
        type,
        gear_enchantments ( enchantment:enchantments ( slug, name ) ),
        location_gear_drops ( drop_rate, location:locations ( slug, name ) ),
        enemy_gear_drops ( drop_rate, enemy:enemies ( slug, name ) )
      `,
    )
    .order('name')

  if (error) {
    throw new CatalogQueryError(error.message)
  }

  return ((data ?? []) as Array<GearQueryRow>).flatMap((row) => {
    const rarity = GEAR_RARITIES.find((value) => value === row.rarity)

    if (!rarity) {
      return []
    }

    return [
      {
        name: row.name,
        slug: row.slug,
        description: row.description,
        rarity,
        type: row.type,
        enchantments: compactMap(row.gear_enchantments, (entry) => mapNamedRef(entry.enchantment)),
        locationSources: compactMap(row.location_gear_drops, (entry) =>
          mapDrop({ drop_rate: entry.drop_rate, target: entry.location }),
        ),
        enemySources: compactMap(row.enemy_gear_drops, (entry) =>
          mapDrop({ drop_rate: entry.drop_rate, target: entry.enemy }),
        ),
      },
    ]
  })
}
