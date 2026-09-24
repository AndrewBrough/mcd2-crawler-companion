import { supabase } from '#/lib/supabase/client'
import { compactMap, mapDrop, type NamedEmbed } from '#/lib/catalog/map-drop'
import { CatalogQueryError } from '#/lib/catalog/query-error'
import type { GearListItem } from '#/types/data/gear'

type GearQueryRow = {
  name: string
  slug: string
  description: string
  type: GearListItem['type']
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
        type,
        location_gear_drops ( drop_rate, location:locations ( slug, name ) ),
        enemy_gear_drops ( drop_rate, enemy:enemies ( slug, name ) )
      `,
    )
    .order('name')

  if (error) {
    throw new CatalogQueryError(error.message)
  }

  return ((data ?? []) as Array<GearQueryRow>).map((row) => ({
    name: row.name,
    slug: row.slug,
    description: row.description,
    type: row.type,
    locationSources: compactMap(row.location_gear_drops, (entry) =>
      mapDrop({ drop_rate: entry.drop_rate, target: entry.location }),
    ),
    enemySources: compactMap(row.enemy_gear_drops, (entry) =>
      mapDrop({ drop_rate: entry.drop_rate, target: entry.enemy }),
    ),
  }))
}
