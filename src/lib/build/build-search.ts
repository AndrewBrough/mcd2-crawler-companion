import { catalogSlugSearch, type CatalogSlugSearch } from '#/lib/catalog/catalog-slug-search'
import { BUILD_SOCKET_SEARCH_KEYS, type BuildSocketParam } from './build-socket-params'

export type BuildSearch = CatalogSlugSearch & {
  name?: string
} & Partial<Record<BuildSocketParam, string>>

export function buildSearch(search: Record<string, unknown>): BuildSearch {
  const result: BuildSearch = catalogSlugSearch(search)
  const name = search.name

  if (typeof name === 'string' && name.trim() !== '') {
    result.name = name.trim()
  }

  for (const key of BUILD_SOCKET_SEARCH_KEYS) {
    const value = search[key]
    if (typeof value === 'string' && value.trim() !== '') {
      result[key] = value.trim()
    }
  }

  return result
}
