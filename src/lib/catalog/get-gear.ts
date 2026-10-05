import { supabase } from '#/lib/supabase/client'
import { compactMap, mapDrop, mapNamedRef, type NamedEmbed } from '#/lib/catalog/map-drop'
import { CatalogQueryError } from '#/lib/catalog/query-error'
import { GEAR_RARITIES, type GearListItem, type GearRarity } from '#/types/data/gear'

type EffectLink = { effect_id: string }

type ArchetypeEmbed = {
  name: string
  archetype_effects: Array<EffectLink>
}

type SetEmbed = {
  set_archetypes: Array<{
    archetypes: ArchetypeEmbed | null
  }> | null
  set_effects: Array<EffectLink> | null
} | null

function setPools(set: SetEmbed): { archetypeNames: Array<string>; effectSlugs: Array<string> } {
  if (!set) {
    return { archetypeNames: [], effectSlugs: [] }
  }

  const archetypes = (set.set_archetypes ?? []).flatMap((link) =>
    link.archetypes ? [link.archetypes] : [],
  )
  const fromArchetypes = archetypes.flatMap((archetype) =>
    archetype.archetype_effects.map((row) => row.effect_id),
  )
  const direct = (set.set_effects ?? []).map((row) => row.effect_id)

  return {
    archetypeNames: archetypes.map((archetype) => archetype.name),
    effectSlugs: [...new Set([...fromArchetypes, ...direct])],
  }
}

type GearQueryRow = {
  name: string
  slug: string
  description: string
  rarity: Array<string>
  type: GearListItem['type']
  variants: Array<string> | null
  sets: SetEmbed
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
        variants,
        sets (
          set_archetypes ( archetypes ( name, archetype_effects ( effect_id ) ) ),
          set_effects ( effect_id )
        ),
        gear_enchantments ( enchantment:enchantments ( slug, name ) ),
        location_gear_drops ( drop_rate, location:locations ( slug, name ) ),
        enemy_gear_drops ( drop_rate, enemy:enemies ( slug, name ) )
      `,
    )
    .order('name')

  if (error) {
    throw new CatalogQueryError(error.message)
  }

  const rows = ((data ?? []) as Array<GearQueryRow>).flatMap((row) => {
    const rarity = row.rarity.filter((value): value is GearRarity =>
      GEAR_RARITIES.some((entry) => entry === value),
    )

    if (rarity.length !== row.rarity.length) {
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
        ...setPools(row.sets),
        variants: row.variants ?? [],
        locationSources: compactMap(row.location_gear_drops, (entry) =>
          mapDrop({ drop_rate: entry.drop_rate, target: entry.location }),
        ),
        enemySources: compactMap(row.enemy_gear_drops, (entry) =>
          mapDrop({ drop_rate: entry.drop_rate, target: entry.enemy }),
        ),
      },
    ]
  })
  const names = new Map(rows.map((row) => [row.slug, row.name]))

  return rows.map((row) => ({
    ...row,
    variants: row.variants.flatMap((slug) => {
      const name = names.get(slug)
      return name ? [{ slug, name }] : []
    }),
  }))
}
