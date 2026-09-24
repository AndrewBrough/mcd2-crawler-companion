import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const GEAR_TYPES = [
  'melee_weapon',
  'ranged_weapon',
  'armor',
  'artifact',
  'talisman',
]
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const csvPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../supabase/seeds/gear.csv',
)

const prune = process.argv.includes('--prune')

function parseCsv(text) {
  const rows = []
  let field = ''
  let row = []
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"'
        i += 1
      } else if (char === '"') {
        inQuotes = false
      } else {
        field += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      row.push(field)
      field = ''
    } else if (char === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (char !== '\r') {
      field += char
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter((entry) => entry.some((value) => value.length > 0))
}

function sqlLiteral(value) {
  if (value === null) {
    return 'null'
  }

  return `'${value.replaceAll("'", "''")}'`
}

const csv = (await readFile(csvPath, 'utf8')).trim()
const [header, ...body] = parseCsv(csv)
const index = Object.fromEntries(header.map((column, i) => [column.trim(), i]))

const required = ['name', 'slug', 'type', 'description']
for (const column of required) {
  if (index[column] === undefined) {
    throw new Error(`gear.csv is missing column: ${column}`)
  }
}

const gear = body.map((entry, rowNumber) => {
  const name = entry[index.name]?.trim() ?? ''
  const slug = entry[index.slug]?.trim() ?? ''
  const type = entry[index.type]?.trim() ?? ''
  const description = entry[index.description]?.trim() ?? ''

  if (!name) {
    throw new Error(`gear.csv row ${rowNumber + 2} is missing a name`)
  }

  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`gear.csv row ${rowNumber + 2} has invalid slug: ${slug}`)
  }

  if (!GEAR_TYPES.includes(type)) {
    throw new Error(`gear.csv row ${rowNumber + 2} has invalid type: ${type}`)
  }

  return {
    name,
    slug,
    type,
    description,
  }
})

const slugs = gear.map((item) => item.slug)
const duplicateSlug = slugs.find((slug, i) => slugs.indexOf(slug) !== i)

if (duplicateSlug) {
  throw new Error(`gear.csv has duplicate slug: ${duplicateSlug}`)
}

const upsertSql = `insert into public.gear (name, slug, type, description)
values
${gear
  .map(
    (item) =>
      `  (${sqlLiteral(item.name)}, ${sqlLiteral(item.slug)}, ${sqlLiteral(item.type)}, ${sqlLiteral(item.description)})`,
  )
  .join(',\n')}
on conflict (slug) do update
set
  name = excluded.name,
  type = excluded.type,
  description = excluded.description;`

const supabaseUrl = process.env.VITE_SUPABASE_URL
const secretKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl || !secretKey) {
  console.log(upsertSql)
  if (prune) {
    console.log(
      `\ndelete from public.gear\nwhere slug not in (${slugs.map(sqlLiteral).join(', ')});`,
    )
  }
  console.error(
    'Printed SQL because SUPABASE_SECRET_KEY is missing. Add it to .env.local (not VITE_) to apply automatically.',
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, secretKey)
const { error: upsertError } = await supabase.from('gear').upsert(gear, { onConflict: 'slug' })

if (upsertError) {
  throw new Error(upsertError.message)
}

if (prune) {
  const { data: existing, error: readError } = await supabase.from('gear').select('slug')

  if (readError) {
    throw new Error(readError.message)
  }

  const keep = new Set(slugs)
  const extra = (existing ?? []).map((row) => row.slug).filter((slug) => !keep.has(slug))

  if (extra.length) {
    const { error: deleteError } = await supabase.from('gear').delete().in('slug', extra)

    if (deleteError) {
      throw new Error(deleteError.message)
    }
  }
}

console.log(`Synced ${gear.length} gear rows from supabase/seeds/gear.csv`)
