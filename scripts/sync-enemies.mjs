import { syncCatalogCsv } from './sync-catalog-csv.mjs'

await syncCatalogCsv({
  table: 'enemies',
  csvFile: 'enemies.csv',
  required: ['name', 'slug', 'description'],
})
