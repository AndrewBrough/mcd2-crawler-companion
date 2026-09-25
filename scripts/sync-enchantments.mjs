import { syncCatalogCsv } from './sync-catalog-csv.mjs'

const GEAR_TYPES = [
  'melee_weapon',
  'ranged_weapon',
  'armor',
  'artifact',
  'talisman',
]

await syncCatalogCsv({
  table: 'enchantments',
  csvFile: 'enchantments.csv',
  required: ['name', 'slug', 'gear_type', 'description'],
  enums: { gear_type: GEAR_TYPES },
})
