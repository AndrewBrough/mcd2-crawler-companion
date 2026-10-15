import { supabase } from '#/lib/supabase/client'
import { CatalogQueryError } from '#/lib/catalog/query-error'
import type { Archetype } from '#/types/data/archetype'

type ArchetypeQueryRow = {
  slug: string
  name: string
  archetype_effects: Array<{ effect_id: string }> | null
}

export async function getArchetypes(): Promise<Array<Archetype>> {
  const { data, error } = await supabase
    .from('archetypes')
    .select('slug, name, archetype_effects ( effect_id )')
    .order('name')

  if (error) {
    throw new CatalogQueryError(error.message)
  }

  return ((data ?? []) as Array<ArchetypeQueryRow>).map((row) => ({
    slug: row.slug,
    name: row.name,
    effectSlugs: (row.archetype_effects ?? []).map((link) => link.effect_id),
  }))
}
