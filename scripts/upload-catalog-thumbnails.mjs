import { createClient } from '@supabase/supabase-js'

const API_URL = 'https://minecraft.wiki/api.php'
const USER_AGENT = 'mcd2-crawler-companion/seed-scraper (noncommercial; CC BY-NC-SA 3.0)'
const BUCKET = 'catalog-thumbnails'
const ALLOWED_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
const MAX_BYTES = 5 * 1024 * 1024

function hasUploadCredentials() {
  return Boolean(process.env.VITE_SUPABASE_URL && process.env.SUPABASE_SECRET_KEY)
}

function infoboxImage(wikitext) {
  const match = wikitext.match(/^\s*\|\s*image\s*=\s*(.*)$/m)
  if (!match) {
    return ''
  }

  const file = match[1].match(/\[\[(?:File|Image):([^\]|]+)/i)
  const value = (file?.[1] ?? match[1]).split('|')[0].trim()
  if (!value || value.includes('{')) {
    return ''
  }

  return value
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

async function mapPool(items, limit, worker) {
  const results = new Array(items.length)
  let index = 0

  async function run() {
    while (index < items.length) {
      const current = index
      index += 1
      results[current] = await worker(items[current])
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => run()))
  return results
}

function resolvedPageTitle(data, requestedTitle) {
  const normalized = new Map((data.query?.normalized ?? []).map((entry) => [entry.from, entry.to]))
  const redirects = new Map((data.query?.redirects ?? []).map((entry) => [entry.from, entry.to]))
  const normalizedTitle = normalized.get(requestedTitle) ?? requestedTitle
  return redirects.get(normalizedTitle) ?? redirects.get(requestedTitle) ?? normalizedTitle
}

async function fetchWikitext(names, pageTitle) {
  const wikitextByName = new Map()

  for (let start = 0; start < names.length; start += 40) {
    const chunk = names.slice(start, start + 40)
    const data = await fetchJson({
      action: 'query',
      redirects: '1',
      prop: 'revisions',
      rvprop: 'content',
      rvslots: 'main',
      titles: chunk.map(pageTitle).join('|'),
    })
    const pages = new Map((data.query?.pages ?? []).map((page) => [page.title, page]))

    for (const name of chunk) {
      const page = pages.get(resolvedPageTitle(data, pageTitle(name)))
      wikitextByName.set(name, page?.revisions?.[0]?.slots?.main?.content ?? '')
    }
  }

  return wikitextByName
}

async function fetchImageInfo(filenames) {
  const infoByFilename = new Map()

  for (let start = 0; start < filenames.length; start += 40) {
    const chunk = filenames.slice(start, start + 40)
    const data = await fetchJson({
      action: 'query',
      redirects: '1',
      prop: 'imageinfo',
      iiprop: 'url|mime|size',
      titles: chunk.map((filename) => `File:${filename}`).join('|'),
    })
    const pages = new Map((data.query?.pages ?? []).map((page) => [page.title, page]))

    for (const filename of chunk) {
      const info = pages.get(resolvedPageTitle(data, `File:${filename}`))?.imageinfo?.[0]
      if (info?.url) {
        infoByFilename.set(filename, info)
      }
    }
  }

  return infoByFilename
}

async function storedFileNames(supabase, kind) {
  const names = new Set()
  let offset = 0

  while (true) {
    const { data, error } = await supabase.storage.from(BUCKET).list(kind, {
      limit: 100,
      offset,
    })

    if (error) {
      throw new Error(error.message)
    }

    if (!data?.length) {
      break
    }

    for (const file of data) {
      if (file.name) {
        names.add(file.name)
      }
    }

    if (data.length < 100) {
      break
    }

    offset += data.length
  }

  return names
}

async function downloadImage(url) {
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  if (!response.ok) {
    throw new Error(`Image download returned ${response.status}`)
  }

  return Buffer.from(await response.arrayBuffer())
}

export async function syncCatalogThumbnails({
  kind,
  items,
  pageTitle = (name) => `Dungeons II:${name}`,
  replace = false,
}) {
  if (!hasUploadCredentials()) {
    console.error(
      'Skipped thumbnail upload because SUPABASE_SECRET_KEY is missing. Add it to .env.local (not VITE_).',
    )
    return
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)
  const stored = replace ? new Set() : await storedFileNames(supabase, kind)
  const missing = items.filter((item) => item.slug && !stored.has(`${item.slug}.png`))

  if (missing.length === 0) {
    console.log(`Thumbnails already stored for ${items.length} ${kind} rows.`)
    return
  }

  const needsPage = missing.filter((item) => !item.image)
  const wikitextByName = needsPage.length
    ? await fetchWikitext(
        [...new Set(needsPage.map((item) => item.name))],
        pageTitle,
      )
    : new Map()
  const files = missing.map((item) => ({
    slug: item.slug,
    name: item.name,
    filename: item.image || infoboxImage(wikitextByName.get(item.name) ?? ''),
  }))
  const withoutImage = files.filter((file) => !file.filename)
  const infoByFilename = await fetchImageInfo(files.map((file) => file.filename).filter(Boolean))
  let uploaded = 0
  const failed = []

  await mapPool(
    files.filter((file) => file.filename),
    4,
    async (file) => {
      const info = infoByFilename.get(file.filename)
      if (!info || !ALLOWED_MIME_TYPES.has(info.mime) || info.size > MAX_BYTES) {
        failed.push(file.name)
        return
      }

      try {
        const bytes = await downloadImage(info.url)
        const { error } = await supabase.storage.from(BUCKET).upload(`${kind}/${file.slug}.png`, bytes, {
          contentType: info.mime,
          upsert: replace,
        })

        if (error) {
          throw new Error(error.message)
        }

        uploaded += 1
      } catch (error) {
        failed.push(file.name)
        console.error(`Thumbnail failed for ${file.name}: ${error.message}`)
      }
    },
  )

  console.log(
    replace
      ? `Replaced ${uploaded} ${kind} thumbnails in ${BUCKET}/${kind}/.`
      : `Uploaded ${uploaded} ${kind} thumbnails to ${BUCKET}/${kind}/ (${stored.size} already stored).`,
  )

  if (withoutImage.length) {
    console.log(`No wiki image for: ${withoutImage.map((file) => file.name).join(', ')}`)
  }

  const rejected = failed.filter((name) => !withoutImage.some((file) => file.name === name))
  if (rejected.length) {
    console.log(`Could not upload: ${rejected.join(', ')}`)
  }
}
