import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'
import { parseCsv } from './sync-catalog-csv.mjs'

const CSV_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../supabase/seeds/enchantments.csv',
)

function slugList(value) {
  return value ? value.split('|').filter(Boolean) : []
}

const csv = (await readFile(CSV_PATH, 'utf8')).trim()
const [header, ...body] = parseCsv(csv)
const index = Object.fromEntries(header.map((column, i) => [column.trim(), i]))
const rows = body.map((entry) => {
  const cell = (column) => entry[index[column]]?.trim() ?? ''

  return {
    name: cell('name'),
    slug: cell('slug'),
    description: cell('description'),
    tier_1: cell('tier_1'),
    tier_2: cell('tier_2'),
    tier_3: cell('tier_3'),
    gear_types: slugList(cell('gear_types')),
    categories: slugList(cell('categories')),
    sources: slugList(cell('sources')),
  }
})

const supabaseUrl = process.env.VITE_SUPABASE_URL
const secretKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl || !secretKey) {
  throw new Error('VITE_SUPABASE_URL and SUPABASE_SECRET_KEY are required to sync enchantments.')
}

const supabase = createClient(supabaseUrl, secretKey)
const { error } = await supabase.from('enchantments').upsert(rows, { onConflict: 'slug' })

if (error) {
  throw new Error(error.message)
}

console.log(`Synced ${rows.length} enchantments rows from supabase/seeds/enchantments.csv`)
