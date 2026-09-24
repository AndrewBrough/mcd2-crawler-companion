import { supabase } from '#/lib/supabase/client'
import { compactMap, mapDrop, mapNamedRef, type NamedEmbed } from '#/lib/catalog/map-drop'
import { CatalogQueryError } from '#/lib/catalog/query-error'
import type { EnemyListItem } from '#/types/data/enemy'

type EnemyQueryRow = {
  name: string
  slug: string
  description: string
  location_enemies: Array<{ location: NamedEmbed }> | null
  enemy_gear_drops: Array<{ drop_rate: number | string; gear: NamedEmbed }> | null
  enemy_item_drops: Array<{ drop_rate: number | string; item: NamedEmbed }> | null
}

export async function getEnemies(): Promise<Array<EnemyListItem>> {
  const { data, error } = await supabase
    .from('enemies')
    .select(
      `
        name,
        slug,
        description,
        location_enemies ( location:locations ( slug, name ) ),
        enemy_gear_drops ( drop_rate, gear:gear ( slug, name ) ),
        enemy_item_drops ( drop_rate, item:items ( slug, name ) )
      `,
    )
    .order('name')

  if (error) {
    throw new CatalogQueryError(error.message)
  }

  return ((data ?? []) as Array<EnemyQueryRow>).map((row) => ({
    name: row.name,
    slug: row.slug,
    description: row.description,
    locations: compactMap(row.location_enemies, (entry) => mapNamedRef(entry.location)),
    gearDrops: compactMap(row.enemy_gear_drops, (entry) =>
      mapDrop({ drop_rate: entry.drop_rate, target: entry.gear }),
    ),
    itemDrops: compactMap(row.enemy_item_drops, (entry) =>
      mapDrop({ drop_rate: entry.drop_rate, target: entry.item }),
    ),
  }))
}
