import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function parseCsv(text) {
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
  if (Array.isArray(value)) {
    return `array[${value.map((entry) => sqlLiteral(entry)).join(', ')}]::text[]`
  }

  return `'${String(value).replaceAll("'", "''")}'`
}

async function readCatalogCsv(csvFile, required, enums, lists) {
  const csvPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../supabase/seeds',
    csvFile,
  )
  const csv = (await readFile(csvPath, 'utf8')).trim()
  const [header, ...body] = parseCsv(csv)
  const index = Object.fromEntries(header.map((column, i) => [column.trim(), i]))

  for (const column of required) {
    if (index[column] === undefined) {
      throw new Error(`${csvFile} is missing column: ${column}`)
    }
  }

  return body.map((entry, rowNumber) => {
    const record = Object.fromEntries(
      required.map((column) => [column, entry[index[column]]?.trim() ?? '']),
    )

    if (!record.name) {
      throw new Error(`${csvFile} row ${rowNumber + 2} is missing a name`)
    }

    if (!SLUG_PATTERN.test(record.slug)) {
      throw new Error(`${csvFile} row ${rowNumber + 2} has invalid slug: ${record.slug}`)
    }

    for (const [column, allowed] of Object.entries(enums)) {
      if (!allowed.includes(record[column])) {
        throw new Error(`${csvFile} row ${rowNumber + 2} has invalid ${column}: ${record[column]}`)
      }
    }

    for (const [column, allowed] of Object.entries(lists)) {
      const values = record[column]
        .split('|')
        .map((value) => value.trim())
        .filter(Boolean)

      if (!values.length || values.some((value) => !allowed.includes(value))) {
        throw new Error(`${csvFile} row ${rowNumber + 2} has invalid ${column}: ${record[column]}`)
      }

      record[column] = values
    }

    return record
  })
}

export async function syncCatalogCsv({
  table,
  csvFile,
  csvFiles,
  required,
  enums = {},
  lists = {},
}) {
  const files = csvFiles ?? [csvFile]
  const prune = process.argv.includes('--prune')
  const rows = (
    await Promise.all(files.map((file) => readCatalogCsv(file, required, enums, lists)))
  ).flat()

  const slugs = rows.map((item) => item.slug)
  const duplicateSlug = slugs.find((slug, i) => slugs.indexOf(slug) !== i)

  if (duplicateSlug) {
    throw new Error(`${files.join(', ')} has duplicate slug: ${duplicateSlug}`)
  }

  const updateColumns = required.filter((column) => column !== 'slug')
  const upsertSql = `insert into public.${table} (${required.join(', ')})
values
${rows
  .map((item) => `  (${required.map((column) => sqlLiteral(item[column])).join(', ')})`)
  .join(',\n')}
on conflict (slug) do update
set
${updateColumns.map((column) => `  ${column} = excluded.${column}`).join(',\n')};`

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !secretKey) {
    console.log(upsertSql)
    if (prune) {
      console.log(
        `\ndelete from public.${table}\nwhere slug not in (${slugs.map(sqlLiteral).join(', ')});`,
      )
    }
    console.error(
      'Printed SQL because SUPABASE_SECRET_KEY is missing. Add it to .env.local (not VITE_) to apply automatically.',
    )
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, secretKey)
  const { error: upsertError } = await supabase.from(table).upsert(rows, { onConflict: 'slug' })

  if (upsertError) {
    throw new Error(upsertError.message)
  }

  if (prune) {
    const { data: existing, error: readError } = await supabase.from(table).select('slug')

    if (readError) {
      throw new Error(readError.message)
    }

    const keep = new Set(slugs)
    const extra = (existing ?? []).map((row) => row.slug).filter((slug) => !keep.has(slug))

    if (extra.length) {
      const { error: deleteError } = await supabase.from(table).delete().in('slug', extra)

      if (deleteError) {
        throw new Error(deleteError.message)
      }
    }
  }

  const sources = files.map((file) => `supabase/seeds/${file}`).join(', ')
  console.log(`Synced ${rows.length} ${table} rows from ${sources}`)
}

export async function syncAssociationCsv({ table, csvFile, columns, conflict }) {
  const csvPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../supabase/seeds',
    csvFile,
  )
  const prune = process.argv.includes('--prune')
  const csv = (await readFile(csvPath, 'utf8')).trim()
  const [header, ...body] = parseCsv(csv)
  const index = Object.fromEntries(header.map((column, i) => [column.trim(), i]))

  for (const column of columns) {
    if (index[column] === undefined) {
      throw new Error(`${csvFile} is missing column: ${column}`)
    }
  }

  const rows = body.map((entry, rowNumber) => {
    const record = Object.fromEntries(
      columns.map((column) => [column, entry[index[column]]?.trim() ?? '']),
    )

    for (const column of columns) {
      if (!SLUG_PATTERN.test(record[column])) {
        throw new Error(`${csvFile} row ${rowNumber + 2} has invalid ${column}: ${record[column]}`)
      }
    }

    return record
  })

  const keys = rows.map((item) => columns.map((column) => item[column]).join('\0'))
  const duplicate = keys.find((key, i) => keys.indexOf(key) !== i)

  if (duplicate) {
    throw new Error(`${csvFile} has a duplicate association`)
  }

  const upsertSql = `insert into public.${table} (${columns.join(', ')})
values
${rows
  .map((item) => `  (${columns.map((column) => sqlLiteral(item[column])).join(', ')})`)
  .join(',\n')}
on conflict (${conflict}) do nothing;`

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !secretKey) {
    console.log(upsertSql)
    if (prune) {
      const keep = rows
        .map((item) => `(${columns.map((column) => sqlLiteral(item[column])).join(', ')})`)
        .join(', ')
      console.log(
        `\ndelete from public.${table}\nwhere (${columns.join(', ')}) not in (${keep});`,
      )
    }
    console.error(
      'Printed SQL because SUPABASE_SECRET_KEY is missing. Add it to .env.local (not VITE_) to apply automatically.',
    )
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, secretKey)
  const { error: upsertError } = await supabase.from(table).upsert(rows, { onConflict: conflict })

  if (upsertError) {
    throw new Error(upsertError.message)
  }

  if (prune) {
    const { data: existing, error: readError } = await supabase.from(table).select(columns.join(', '))

    if (readError) {
      throw new Error(readError.message)
    }

    const keep = new Set(keys)
    const extra = (existing ?? []).filter(
      (row) => !keep.has(columns.map((column) => row[column]).join('\0')),
    )

    for (const row of extra) {
      let query = supabase.from(table).delete()
      for (const column of columns) {
        query = query.eq(column, row[column])
      }
      const { error: deleteError } = await query
      if (deleteError) {
        throw new Error(deleteError.message)
      }
    }
  }

  console.log(`Synced ${rows.length} ${table} rows from supabase/seeds/${csvFile}`)
}
