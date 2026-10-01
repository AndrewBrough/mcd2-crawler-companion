import { catalogSlugSearch, type CatalogSlugSearch } from '#/lib/catalog/catalog-slug-search'

export type BuildSearch = CatalogSlugSearch & {
  name?: string
}

export function buildSearch(search: Record<string, unknown>): BuildSearch {
  const result: BuildSearch = catalogSlugSearch(search)
  const name = search.name

  if (typeof name === 'string' && name.trim() !== '') {
    result.name = name.trim()
  }

  return result
}
