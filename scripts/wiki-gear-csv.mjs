import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseCsv } from './sync-catalog-csv.mjs'
import { syncCatalogThumbnails } from './upload-catalog-thumbnails.mjs'

const API_URL = 'https://minecraft.wiki/api.php'
const USER_AGENT = 'mcd2-crawler-companion/seed-scraper (noncommercial; CC BY-NC-SA 3.0)'
const SEEDS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../supabase/seeds')

export function slugify(name) {
  return name
    .normalize('NFKD')
    .replace(/['’]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function csvField(value) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`
  }
  return value
}

export function plainWiki(text) {
  let value = text.replace(/\[\[(?:[^\]|]+\|)?([^\]]+)\]\]/g, '$1')

  for (let pass = 0; pass < 4; pass += 1) {
    const next = value.replace(/\{\{[^{}]+\}\}/g, (block) => {
      const parts = block.slice(2, -2).split('|').map((part) => part.trim())
      const last = parts.at(-1) ?? ''
      if (parts.length === 1 || last.includes('=')) {
        return ''
      }
      return last
    })
    if (next === value) {
      break
    }
    value = next
  }

  return value
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/'{2,}/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\}\}+/g, '')
    .trim()
}

function wikiDescription(wikitext) {
  return plainWiki(infoboxField(wikitext, 'description'))
}

function listRarity(row) {
  const match = row.match(/\{\{DungeonsIIRarity\|([^}]+)\}\}/i)
  const value = match?.[1]?.trim().toLowerCase() ?? ''

  if (value === 'unique' || value.endsWith('=unique')) {
    return 'unique'
  }

  if (value === 'br') {
    return BASE_GEAR_RARITY
  }

  return null
}

function entriesInSection(wikitext, heading, pageUrl, options) {
  const lines = wikitext.split('\n')
  const start = lines.findIndex((line) => new RegExp(`^=+\\s*${heading}\\s*=+\\s*$`).test(line))

  if (start === -1) {
    throw new Error(`Could not find "${heading}" on ${pageUrl}`)
  }

  const body = []
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith('==')) {
      break
    }
    body.push(line)
  }

  const rows = []
  let current = []

  for (const line of body) {
    if (line.startsWith('|-') || line.startsWith('*')) {
      if (current.length > 0) {
        rows.push(current.join('\n'))
      }
      current = [line]
      continue
    }

    current.push(line)
  }

  if (current.length > 0) {
    rows.push(current.join('\n'))
  }

  return rows.map((row) => entryFromRow(row, options)).filter(Boolean)
}

function entryFromRow(row, options = {}) {
  const imageMatch = row.match(/\[\[(?:File|Image):([^\]|]+)/i)
  const searchable = imageMatch ? row.slice(imageMatch.index + imageMatch[0].length) : row
  const templates = [
    { priority: 0, match: searchable.match(/\{\{MCD2(?:Link)?\|([^}]+)\}\}/) },
    { priority: 1, match: searchable.match(/\[\[Dungeons II:([^\]|#]+)(?:\|[^\]]*)?\]\]/) },
    options.plainLinks
      ? {
          priority: 2,
          match: searchable.match(/\[\[(?!(?:File|Image|Category):)([^\]|#]+)(?:\|[^\]]*)?\]\]/i),
        }
      : null,
  ].filter((entry) => entry?.match)

  templates.sort(
    (left, right) => left.match.index - right.match.index || left.priority - right.priority,
  )
  const name = templates[0]?.match[1]?.trim()

  if (!name || name.includes('{')) {
    return null
  }

  return {
    name,
    image: imageMatch?.[1]?.trim() ?? '',
    listRarity: listRarity(row),
  }
}

function namesInSection(wikitext, heading, pageUrl) {
  return entriesInSection(wikitext, heading, pageUrl).map((entry) => entry.name)
}

async function fetchJson(params) {
  const url = new URL(API_URL)
  url.search = new URLSearchParams({ format: 'json', formatversion: '2', ...params })
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
    },
  })

  if (!response.ok) {
    throw new Error(`Minecraft Wiki API returned ${response.status}`)
  }

  return response.json()
}

export async function fetchPage(pageTitle, pageUrl) {
  const data = await fetchJson({
    action: 'query',
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main',
    titles: pageTitle,
  })
  const page = data.query?.pages?.[0]
  const wikitext = page?.revisions?.[0]?.slots?.main?.content

  if (!wikitext) {
    throw new Error(`Minecraft Wiki did not return wikitext for ${pageUrl}`)
  }

  return wikitext
}

function infoboxField(wikitext, key) {
  const match = wikitext.match(new RegExp(`^\\s*\\|\\s*${key}\\s*=\\s*(.*)$`, 'mi'))
  return match?.[1]?.trim() ?? ''
}

const GEAR_RARITIES = ['common', 'rare', 'special', 'unique']
const BASE_GEAR_RARITY = 'common|rare|special'

function isUniqueGear(wikitext, name, uniqueGear) {
  const setName = infoboxField(wikitext, 'set').toLowerCase()
  const lead = wikitext.split('\n==')[0]

  return (
    uniqueGear.names.has(name.toLowerCase()) ||
    (setName !== '' && uniqueGear.sets.has(setName)) ||
    /\{\{MCD2\|unique\}\}/i.test(lead)
  )
}

function gearRarity(wikitext, name, uniqueGear) {
  const field = infoboxField(wikitext, 'rarity').toLowerCase()

  if (field === 'unique' || isUniqueGear(wikitext, name, uniqueGear)) {
    return 'unique'
  }

  if (GEAR_RARITIES.includes(field)) {
    return field
  }

  return BASE_GEAR_RARITY
}

async function fetchWikitextByName(names) {
  const wikitextByName = new Map()

  for (let start = 0; start < names.length; start += 40) {
    const chunk = names.slice(start, start + 40)
    const data = await fetchJson({
      action: 'query',
      redirects: '1',
      prop: 'revisions',
      rvprop: 'content',
      rvslots: 'main',
      titles: chunk.map((name) => `Dungeons II:${name}`).join('|'),
    })
    const pages = new Map((data.query?.pages ?? []).map((page) => [page.title, page]))
    const redirects = new Map((data.query?.redirects ?? []).map((entry) => [entry.from, entry.to]))

    for (const name of chunk) {
      const redirected = redirects.get(`Dungeons II:${name}`)
      const page = pages.get(redirected ?? `Dungeons II:${name}`)
      wikitextByName.set(name, page?.revisions?.[0]?.slots?.main?.content ?? '')
    }
  }

  return wikitextByName
}

async function fetchUniqueGear() {
  const pageUrl = 'https://minecraft.wiki/w/Dungeons_II:Rarity'
  const wikitext = await fetchPage('Dungeons II:Rarity', pageUrl)
  const names = new Set(
    ['Melee weapons', 'Ranged weapons'].flatMap((heading) =>
      namesInSection(wikitext, heading, pageUrl).map((name) => name.toLowerCase()),
    ),
  )
  const sets = new Set(
    namesInSection(wikitext, 'Armor sets', pageUrl).map((name) =>
      name.replace(/\s+armor$/i, '').toLowerCase(),
    ),
  )

  return { names, sets }
}

function rowsFromCsv(csv) {
  const [header, ...body] = parseCsv(csv.trim())
  const index = Object.fromEntries(header.map((column, i) => [column.trim(), i]))

  return body.map((entry) => ({
    name: entry[index.name]?.trim() ?? '',
    slug: entry[index.slug]?.trim() ?? '',
    type: entry[index.type]?.trim() ?? '',
    description: entry[index.description]?.trim() ?? '',
    rarity: entry[index.rarity]?.trim() || BASE_GEAR_RARITY,
  }))
}

function gearCsv(rows, weaponSets) {
  const fields = ['name', 'slug', 'type', 'description', 'rarity']

  if (weaponSets) {
    fields.push('set_id', 'pool')
  }

  const lines = rows.map((row) => fields.map((field) => csvField(row[field] ?? '')).join(','))

  return `${fields.join(',')}\n${lines.join('\n')}\n`
}

function weaponSetId(row, bySlug) {
  if (row.rarity !== 'unique') {
    return row.slug
  }

  const variant = bySlug.get(row.variantSlug)

  if (variant && variant.rarity !== 'unique') {
    return variant.slug
  }

  return ''
}

export async function appendWikiGear({ pageTitle, pageUrl, csvFile, sections, label, weaponSets = false }) {
  const csvPath = path.join(SEEDS_DIR, csvFile)
  const wikitext = await fetchPage(pageTitle, pageUrl)
  const listed = sections.flatMap(({ heading, type, pool }) =>
    entriesInSection(wikitext, heading, pageUrl, { plainLinks: weaponSets }).map((entry) => ({
      name: entry.name,
      type,
      pool: pool ?? '',
      slug: slugify(entry.name),
      image: entry.image,
      listRarity: entry.listRarity,
    })),
  )
  const seen = new Set()
  const items = listed.filter((item) => {
    if (seen.has(item.slug)) {
      return false
    }
    seen.add(item.slug)
    return true
  })
  const previousCsv = await readFile(csvPath, 'utf8')
  const previousSlugs = new Set(rowsFromCsv(previousCsv).map((row) => row.slug))
  const [wikitextByName, uniqueGear] = await Promise.all([
    fetchWikitextByName(items.map((item) => item.name)),
    fetchUniqueGear(),
  ])
  const rows = items.map((item) => {
    const wikitextForItem = wikitextByName.get(item.name) ?? ''
    const row = {
      name: item.name,
      slug: item.slug,
      type: item.type,
      pool: item.pool,
      description: wikiDescription(wikitextForItem),
      rarity: item.listRarity ?? gearRarity(wikitextForItem, item.name, uniqueGear),
      variantSlug: slugify(plainWiki(infoboxField(wikitextForItem, 'variant'))),
    }

    return row
  })
  const bySlug = new Map(rows.map((row) => [row.slug, row]))

  for (const row of rows) {
    row.set_id =
      weaponSets && row.type !== 'artifact' && row.type !== 'talisman' ? weaponSetId(row, bySlug) : ''
  }

  const unresolved = rows.filter((row) => weaponSets && !row.set_id)
  const removed = [...previousSlugs].filter((slug) => !rows.some((row) => row.slug === slug))
  const missing = rows.filter((row) => !row.description)

  await writeFile(csvPath, gearCsv(rows, weaponSets))

  const uniqueCount = rows.filter((row) => row.rarity === 'unique').length
  const baseCount = rows.filter((row) => row.rarity === BASE_GEAR_RARITY).length
  console.log(
    `Wrote ${rows.length} ${label} to supabase/seeds/${csvFile} (${uniqueCount} unique, ${baseCount} common/rare/special).`,
  )
  console.log(`Source: ${pageUrl} (CC BY-NC-SA 3.0)`)

  if (removed.length) {
    console.log(`Removed ${removed.length} ${label} no longer listed: ${removed.join(', ')}`)
  }

  if (missing.length) {
    console.log(`No description found for: ${missing.map((row) => row.name).join(', ')}`)
  }

  if (unresolved.length) {
    console.log(`No base variant for: ${unresolved.map((row) => row.name).join(', ')}`)
  }

  await syncCatalogThumbnails({
    kind: 'gear',
    items,
    replace: process.env.REPLACE_THUMBNAILS === '1',
  })
}
