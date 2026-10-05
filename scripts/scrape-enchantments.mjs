import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { csvField, fetchPage, plainWiki, slugify } from './wiki-gear-csv.mjs'

const PAGE_URL = 'https://minecraft.wiki/w/Dungeons_II:Enchantment'
const CSV_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../supabase/seeds/enchantments.csv',
)

const SECTIONS = [
  { heading: 'Melee Enchantments', gearType: 'melee_weapon', icon: false },
  { heading: 'Ranged Enchantments', gearType: 'ranged_weapon', icon: false },
  { heading: 'Armor Enchantments', gearType: 'armor', icon: true },
]

function tableRows(wikitext, heading) {
  const headingIndex = wikitext.indexOf(`=== ${heading} ===`)
  const start = wikitext.indexOf('{| class="wikitable"', headingIndex)
  const end = wikitext.indexOf('\n|}', start)

  if (headingIndex === -1 || start === -1 || end === -1) {
    throw new Error(`Could not find the ${heading} table on ${PAGE_URL}`)
  }

  return wikitext
    .slice(start, end)
    .split('\n|-')
    .slice(1)
    .map((chunk) =>
      chunk
        .split('\n')
        .filter((line) => line.startsWith('|'))
        .map((line) => line.replace(/^\|\s?/, '').trim()),
    )
}

function labels(cell) {
  return plainWiki(cell)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
}

function rowFromCells(cells, section) {
  const expected = section.icon ? 8 : 7

  if (cells.length !== expected) {
    throw new Error(`${section.heading} row has ${cells.length} cells: ${cells.join(' | ')}`)
  }

  const [nameCell, sourceCell, ...rest] = cells
  const [boostCell, categoryCell, tier1, tier2, tier3] = section.icon ? rest.slice(1) : rest
  const name = plainWiki(nameCell)
  const source = plainWiki(sourceCell)

  return {
    name,
    slug: slugify(name),
    description: plainWiki(boostCell),
    tier1: plainWiki(tier1),
    tier2: plainWiki(tier2),
    tier3: plainWiki(tier3),
    gearTypes: [section.gearType],
    categories: labels(categoryCell),
    sources: source ? [source] : [],
  }
}

function addDistinct(values, next) {
  for (const value of next) {
    if (!values.includes(value)) {
      values.push(value)
    }
  }
}

function enchantmentsFromWiki(wikitext) {
  const bySlug = new Map()

  for (const section of SECTIONS) {
    for (const cells of tableRows(wikitext, section.heading)) {
      const row = rowFromCells(cells, section)
      const existing = bySlug.get(row.slug)

      if (!existing) {
        bySlug.set(row.slug, row)
        continue
      }

      if (
        existing.description !== row.description ||
        existing.tier1 !== row.tier1 ||
        existing.tier2 !== row.tier2 ||
        existing.tier3 !== row.tier3
      ) {
        throw new Error(`Enchantment ${row.slug} differs between wiki sections`)
      }

      addDistinct(existing.gearTypes, row.gearTypes)
      addDistinct(existing.categories, row.categories)
      addDistinct(existing.sources, row.sources)
    }
  }

  return [...bySlug.values()]
}

function enchantmentsCsv(enchantments) {
  const lines = enchantments.map((enchantment) =>
    [
      enchantment.name,
      enchantment.slug,
      enchantment.description,
      enchantment.tier1,
      enchantment.tier2,
      enchantment.tier3,
      enchantment.gearTypes.join('|'),
      enchantment.categories.join('|'),
      enchantment.sources.join('|'),
    ]
      .map(csvField)
      .join(','),
  )

  return `name,slug,description,tier_1,tier_2,tier_3,gear_types,categories,sources\n${lines.join('\n')}\n`
}

const wikitext = await fetchPage('Dungeons II:Enchantment', PAGE_URL)
const enchantments = enchantmentsFromWiki(wikitext)
await writeFile(CSV_PATH, enchantmentsCsv(enchantments))

const shared = enchantments.filter((enchantment) => enchantment.gearTypes.length > 1).length
console.log(
  `Wrote ${enchantments.length} enchantments to supabase/seeds/enchantments.csv (${shared} on more than one gear type).`,
)
console.log(`Source: ${PAGE_URL} (CC BY-NC-SA 3.0)`)
