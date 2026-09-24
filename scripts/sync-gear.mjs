import { syncCatalogCsv } from './sync-catalog-csv.mjs'

const GEAR_TYPES = [
  'melee_weapon',
  'ranged_weapon',
  'armor',
  'artifact',
  'talisman',
]

await syncCatalogCsv({
  table: 'gear',
  csvFile: 'gear.csv',
  required: ['name', 'slug', 'type', 'description'],
  enums: { type: GEAR_TYPES },
})
