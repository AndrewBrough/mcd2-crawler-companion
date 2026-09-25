import { appendFile, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseCsv } from './sync-catalog-csv.mjs'

const API_URL = 'https://minecraft.wiki/api.php'
const USER_AGENT = 'mcd2-crawler-companion/seed-scraper (noncommercial; CC BY-NC-SA 3.0)'
const SEEDS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../supabase/seeds')

function slugify(name) {
  return name
    .normalize('NFKD')
    .replace(/['’]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function csvField(value) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`
  }
  return value
}

function plainWiki(text) {
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
    .trim()
}

function leadDescription(wikitext) {
  for (const line of wikitext.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || /^[{}|=*\s]+$/.test(trimmed)) {
      continue
    }
    if (/^(?:\{\{|\||==|\[\[|\*|<)/.test(trimmed)) {
      continue
    }
    return plainWiki(trimmed)
  }
  return ''
}

function namesInSection(wikitext, heading, pageUrl) {
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

  return body
    .map((line) => line.match(/\{\{MCD2(?:Link)?\|([^}]+)\}\}/)?.[1]?.trim())
    .filter(Boolean)
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

async function fetchPage(pageTitle, pageUrl) {
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

async function fetchDescriptions(names) {
  const descriptions = new Map()

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
      const wikitext = page?.revisions?.[0]?.slots?.main?.content ?? ''
      descriptions.set(name, leadDescription(wikitext))
    }
  }

  return descriptions
}

function existingSlugs(csv, csvFile) {
  const [header, ...body] = parseCsv(csv.trim())
  const slugIndex = header.findIndex((column) => column.trim() === 'slug')

  if (slugIndex === -1) {
    throw new Error(`supabase/seeds/${csvFile} is missing a slug column`)
  }

  return new Set(body.map((row) => row[slugIndex]?.trim()).filter(Boolean))
}

export async function appendWikiGear({ pageTitle, pageUrl, csvFile, sections, label }) {
  const csvPath = path.join(SEEDS_DIR, csvFile)
  const wikitext = await fetchPage(pageTitle, pageUrl)
  const listed = sections.flatMap(({ heading, type }) =>
    namesInSection(wikitext, heading, pageUrl).map((name) => ({
      name,
      type,
      slug: slugify(name),
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
  const csv = await readFile(csvPath, 'utf8')
  const present = existingSlugs(csv, csvFile)
  const additions = items.filter((item) => !present.has(item.slug))

  if (additions.length === 0) {
    console.log(`No new ${label}. ${present.size} rows already in supabase/seeds/${csvFile}`)
    return
  }

  const descriptions = await fetchDescriptions(additions.map((item) => item.name))
  const missing = additions.filter((item) => !descriptions.get(item.name))
  const rows = additions.map((item) =>
    [item.name, item.slug, item.type, descriptions.get(item.name) ?? ''].map(csvField).join(','),
  )
  const prefix = csv.endsWith('\n') ? '' : '\n'
  await appendFile(csvPath, `${prefix}${rows.join('\n')}\n`)

  console.log(
    `Added ${rows.length} ${label} to supabase/seeds/${csvFile} (${items.length - additions.length} already present).`,
  )
  console.log(`Source: ${pageUrl} (CC BY-NC-SA 3.0)`)

  if (missing.length) {
    console.log(`No description found for: ${missing.map((item) => item.name).join(', ')}`)
  }
}
