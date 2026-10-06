import { supabase } from '#/lib/supabase/client'
import { compactMap, mapDrop, type NamedEmbed } from '#/lib/catalog/map-drop'
import { CatalogQueryError } from '#/lib/catalog/query-error'
import {
  ENCHANTMENT_GEAR_TYPES,
  type EnchantmentGearType,
  type EnchantmentTier,
} from '#/types/data/enchantment'
import { GEAR_RARITIES, type GearListItem, type GearRarity, type GearType } from '#/types/data/gear'

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

type EnchantmentNameRow = {
  slug: string
  name: string
  description: string
  tier_1: string
  tier_2: string
  tier_3: string
  gear_types: Array<string>
}

function enchantmentTiers(row: EnchantmentNameRow): Array<EnchantmentTier> {
  return [
    { label: 'I', text: row.tier_1 },
    { label: 'II', text: row.tier_2 },
    { label: 'III', text: row.tier_3 },
  ].filter((tier) => tier.text)
}

function enchantmentTypeForGear(type: GearType): EnchantmentGearType | null {
  if (
    type === 'armor_helmet' ||
    type === 'armor_chest' ||
    type === 'armor_leggings' ||
    type === 'armor_boots'
  ) {
    return 'armor'
  }

  return ENCHANTMENT_GEAR_TYPES.find((entry) => entry === type) ?? null
}

type GearQueryRow = {
  name: string
  slug: string
  description: string
  set_id: string | null
  rarity: Array<string>
  type: GearListItem['type']
  variants: Array<string> | null
  sets: SetEmbed
  location_gear_drops: Array<{ drop_rate: number | string; location: NamedEmbed }> | null
  enemy_gear_drops: Array<{ drop_rate: number | string; enemy: NamedEmbed }> | null
}

export async function getGear(): Promise<Array<GearListItem>> {
  const [gearResult, enchantmentResult] = await Promise.all([
    supabase
      .from('gear')
      .select(
        `
        name,
        slug,
        description,
        set_id,
        rarity,
        type,
        variants,
        sets (
          set_archetypes ( archetypes ( name, archetype_effects ( effect_id ) ) ),
          set_effects ( effect_id )
        ),
        location_gear_drops ( drop_rate, location:locations ( slug, name ) ),
        enemy_gear_drops ( drop_rate, enemy:enemies ( slug, name ) )
      `,
      )
      .order('name'),
    supabase
      .from('enchantments')
      .select('slug, name, description, tier_1, tier_2, tier_3, gear_types')
      .order('name'),
  ])

  if (gearResult.error) {
    throw new CatalogQueryError(gearResult.error.message)
  }

  if (enchantmentResult.error) {
    throw new CatalogQueryError(enchantmentResult.error.message)
  }

  const enchantments = (enchantmentResult.data ?? []) as Array<EnchantmentNameRow>
  const data = gearResult.data

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
        setId: row.set_id,
        rarity,
        type: row.type,
        enchantments: enchantments.flatMap((enchantment) =>
          enchantment.gear_types.includes(enchantmentTypeForGear(row.type) ?? '')
            ? [
                {
                  slug: enchantment.slug,
                  name: enchantment.name,
                  description: enchantment.description,
                  tiers: enchantmentTiers(enchantment),
                },
              ]
            : [],
        ),
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
  const gearBySlug = new Map(rows.map((row) => [row.slug, row]))

  return rows.map((row) => ({
    ...row,
    variants: row.variants.flatMap((slug) => {
      const variant = gearBySlug.get(slug)
      return variant ? [{ slug, name: variant.name, rarity: variant.rarity }] : []
    }),
  }))
}
