import { syncCatalogCsv } from './sync-catalog-csv.mjs'

await syncCatalogCsv({
  table: 'locations',
  csvFile: 'locations.csv',
  required: ['name', 'slug', 'description'],
})
