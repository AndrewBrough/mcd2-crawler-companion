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
  csvFiles: ['weapons.csv', 'armor.csv', 'artifacts.csv', 'talismans.csv'],
  required: ['name', 'slug', 'type', 'description'],
  enums: { type: GEAR_TYPES },
})
