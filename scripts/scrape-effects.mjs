import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { csvField, fetchPage, plainWiki, slugify } from './wiki-gear-csv.mjs'

const PAGE_URL = 'https://minecraft.wiki/w/Dungeons_II:Effect'
const CSV_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../supabase/seeds/effects.csv',
)

function stripCellAttrs(raw) {
  let value = raw.trim()

  while (/^(?:rowspan|colspan)="\d+"\s*\|/.test(value)) {
    value = value.replace(/^(?:rowspan|colspan)="\d+"\s*\|\s*/, '')
  }

  return value.trim()
}

function expandCells(rawCells) {
  const cells = []

  for (const rawCell of rawCells) {
    const value = stripCellAttrs(rawCell)
    const dash = value.match(/^\{\{tc\|-(\|[^}]*)?\}\}$/)
    const colspan = Number(dash?.[1]?.match(/colspan=(\d+)/)?.[1] ?? (dash ? 1 : 0))

    if (!dash) {
      cells.push(value)
      continue
    }

    for (let index = 0; index < colspan; index += 1) {
      cells.push('')
    }
  }

  return cells
}

function tableRows(wikitext) {
  const start = wikitext.indexOf('{| class="wikitable sortable"')
  const end = wikitext.indexOf('\n|}', start)

  if (start === -1 || end === -1) {
    throw new Error(`Could not find the effect table on ${PAGE_URL}`)
  }

  return wikitext
    .slice(start, end)
    .split('\n|-')
    .slice(1)
    .map((chunk) =>
      expandCells(
        chunk
          .split('\n')
          .filter((line) => line.startsWith('|'))
          .map((line) => line.replace(/^\|\s?/, '')),
      ),
    )
}

function percent(cell) {
  const match = plainWiki(cell).match(/(\d+(?:\.\d+)?)\s*%/)
  return match?.[1] ?? ''
}

function slugs(cell) {
  if (!cell || /\{\{tc\|-/.test(cell)) {
    return []
  }

  return cell.split(',').flatMap((part) => {
    const template = part.match(/\{\{MCD2\|([^}]+)\}\}/)

    if (template) {
      const pieces = template[1].split('|').map((piece) => piece.trim())
      const label = pieces.at(-1)?.includes('=') ? pieces[0] : pieces.at(-1)
      const slug = slugify((label ?? '').split('#')[0])
      return slug ? [slug] : []
    }

    const slug = slugify(plainWiki(part))
    return slug ? [slug] : []
  })
}

function effectsFromWiki(wikitext) {
  const effects = []
  let current = null

  for (const cells of tableRows(wikitext)) {
    if (cells.length === 1 && current) {
      current.uniqueBound.push(...slugs(cells[0]))
      continue
    }

    if (cells.length < 8) {
      throw new Error(`Effect row has ${cells.length} cells: ${cells.join(' | ')}`)
    }

    const [nameCell, descriptionCell, level1, level2, level3, uniqueLevel, gearCell, boundCell] =
      cells
    const name = plainWiki(nameCell)

    current = {
      name,
      slug: slugify(name),
      description: plainWiki(descriptionCell),
      level1: percent(level1),
      level2: percent(level2),
      level3: percent(level3),
      uniqueLevel: percent(uniqueLevel),
      gearSlugs: slugs(gearCell),
      uniqueBound: slugs(boundCell),
    }
    effects.push(current)
  }

  const duplicate = effects.find(
    (effect, index) => effects.findIndex((entry) => entry.slug === effect.slug) !== index,
  )

  if (duplicate) {
    throw new Error(`Duplicate effect slug: ${duplicate.slug}`)
  }

  return effects
}

function effectsCsv(effects) {
  const lines = effects.map((effect) =>
    [
      effect.name,
      effect.slug,
      effect.description,
      effect.level1,
      effect.level2,
      effect.level3,
      effect.uniqueLevel,
      effect.gearSlugs.join('|'),
      effect.uniqueBound.join('|'),
    ]
      .map(csvField)
      .join(','),
  )

  return `name,slug,description,level_1,level_2,level_3,unique_level,gear_slugs,unique_bound\n${lines.join('\n')}\n`
}

const wikitext = await fetchPage('Dungeons II:Effect', PAGE_URL)
const effects = effectsFromWiki(wikitext)
await writeFile(CSV_PATH, effectsCsv(effects))

const bound = effects.filter((effect) => effect.uniqueBound.length > 0).length
console.log(`Wrote ${effects.length} effects to supabase/seeds/effects.csv (${bound} unique-bound).`)
console.log(`Source: ${PAGE_URL} (CC BY-NC-SA 3.0)`)
