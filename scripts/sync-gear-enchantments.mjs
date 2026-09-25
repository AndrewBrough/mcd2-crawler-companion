import { syncAssociationCsv } from './sync-catalog-csv.mjs'

await syncAssociationCsv({
  table: 'gear_enchantments',
  csvFile: 'gear_enchantments.csv',
  columns: ['gear_id', 'enchantment_id'],
  conflict: 'gear_id,enchantment_id',
})
