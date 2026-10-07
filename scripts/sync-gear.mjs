import { syncCatalogCsv } from './sync-catalog-csv.mjs'

const GEAR_TYPES = [
  'melee_weapon',
  'ranged_weapon',
  'armor_helmet',
  'armor_chest',
  'armor_leggings',
  'armor_boots',
  'artifact',
  'talisman',
]

await syncCatalogCsv({
  table: 'gear',
  csvFiles: ['armor.csv'],
  required: ['name', 'slug', 'type', 'description', 'rarity'],
  enums: {
    type: GEAR_TYPES,
  },
  lists: {
    rarity: ['common', 'rare', 'special', 'unique'],
  },
})

await syncCatalogCsv({
  table: 'gear',
  csvFiles: ['artifacts.csv', 'talismans.csv'],
  required: ['name', 'slug', 'type', 'description', 'rarity'],
  nullColumns: ['set_id'],
  enums: {
    type: GEAR_TYPES,
  },
  lists: {
    rarity: ['common', 'rare', 'special', 'unique'],
  },
})

await syncCatalogCsv({
  table: 'gear',
  csvFiles: ['weapons.csv'],
  required: ['name', 'slug', 'type', 'description', 'rarity', 'set_id'],
  extras: ['pool'],
  enums: {
    type: GEAR_TYPES,
  },
  lists: {
    rarity: ['common', 'rare', 'special', 'unique'],
  },
  prepare: ensureWeaponSets,
})

async function ensureWeaponSets(supabase, rows) {
  const sets = new Map()

  for (const row of rows) {
    if (!row.set_id || !row.pool || sets.has(row.set_id)) {
      continue
    }

    const base = rows.find((item) => item.slug === row.set_id)
    sets.set(row.set_id, { slug: row.set_id, name: base?.name ?? row.set_id, pool: row.pool })
  }

  const setRows = [...sets.values()].map(({ slug, name }) => ({ slug, name }))
  const { error: setError } = await supabase
    .from('sets')
    .upsert(setRows, { onConflict: 'slug', ignoreDuplicates: true })

  if (setError) {
    throw new Error(setError.message)
  }

  const { data: links, error: linkError } = await supabase
    .from('set_archetypes')
    .select('set_id, archetype_id')
    .in('set_id', ['melee', 'bow', 'crossbow'])

  if (linkError) {
    throw new Error(linkError.message)
  }

  const archetypes = [...sets.values()].flatMap((set) =>
    (links ?? [])
      .filter((link) => link.set_id === set.pool)
      .map((link) => ({ set_id: set.slug, archetype_id: link.archetype_id })),
  )
  const { error: archetypeError } = await supabase
    .from('set_archetypes')
    .upsert(archetypes, { onConflict: 'set_id,archetype_id', ignoreDuplicates: true })

  if (archetypeError) {
    throw new Error(archetypeError.message)
  }
}
