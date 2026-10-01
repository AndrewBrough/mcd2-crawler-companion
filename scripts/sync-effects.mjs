import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'
import { parseCsv } from './sync-catalog-csv.mjs'

const CSV_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../supabase/seeds/effects.csv',
)

function numberOrNull(value) {
  return value ? Number(value) : null
}

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
    level_1: numberOrNull(cell('level_1')),
    level_2: numberOrNull(cell('level_2')),
    level_3: numberOrNull(cell('level_3')),
    unique_level: numberOrNull(cell('unique_level')),
    gear_slugs: slugList(cell('gear_slugs')),
    unique_bound: slugList(cell('unique_bound')),
  }
})

const supabaseUrl = process.env.VITE_SUPABASE_URL
const secretKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl || !secretKey) {
  throw new Error('VITE_SUPABASE_URL and SUPABASE_SECRET_KEY are required to sync effects.')
}

const supabase = createClient(supabaseUrl, secretKey)
const { error } = await supabase.from('effects').upsert(rows, { onConflict: 'slug' })

if (error) {
  throw new Error(error.message)
}

console.log(`Synced ${rows.length} effects rows from supabase/seeds/effects.csv`)
