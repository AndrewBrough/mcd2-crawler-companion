import { supabase } from '#/lib/supabase/client'
import { compactMap, mapDrop, mapNamedRef, type NamedEmbed } from '#/lib/catalog/map-drop'
import { CatalogQueryError } from '#/lib/catalog/query-error'
import type { LocationListItem } from '#/types/data/location'

type LocationQueryRow = {
  name: string
  slug: string
  description: string
  location_enemies: Array<{ enemy: NamedEmbed }> | null
  location_relations: Array<{ related: NamedEmbed }> | null
  location_gear_drops: Array<{ drop_rate: number | string; gear: NamedEmbed }> | null
  location_item_drops: Array<{ drop_rate: number | string; item: NamedEmbed }> | null
}

export async function getLocations(): Promise<Array<LocationListItem>> {
  const { data, error } = await supabase
    .from('locations')
    .select(
      `
        name,
        slug,
        description,
        location_enemies ( enemy:enemies ( slug, name ) ),
        location_relations!location_relations_location_id_fkey (
          related:locations!location_relations_related_location_id_fkey ( slug, name )
        ),
        location_gear_drops ( drop_rate, gear:gear ( slug, name ) ),
        location_item_drops ( drop_rate, item:items ( slug, name ) )
      `,
    )
    .order('name')

  if (error) {
    throw new CatalogQueryError(error.message)
  }

  return ((data ?? []) as Array<LocationQueryRow>).map((row) => ({
    name: row.name,
    slug: row.slug,
    description: row.description,
    enemies: compactMap(row.location_enemies, (entry) => mapNamedRef(entry.enemy)),
    relatedLocations: compactMap(row.location_relations, (entry) => mapNamedRef(entry.related)),
    gearDrops: compactMap(row.location_gear_drops, (entry) =>
      mapDrop({ drop_rate: entry.drop_rate, target: entry.gear }),
    ),
    itemDrops: compactMap(row.location_item_drops, (entry) =>
      mapDrop({ drop_rate: entry.drop_rate, target: entry.item }),
    ),
  }))
}
