import { catalogSlugSearch, type CatalogSlugSearch } from '#/lib/catalog/catalog-slug-search'
import {
  BUILD_PIN_SEARCH_KEYS,
  BUILD_SOCKET_SEARCH_KEYS,
  type BuildPinParam,
  type BuildSocketParam,
} from './build-socket-params'

export type BuildSearch = CatalogSlugSearch & {
  name?: string
} & Partial<Record<BuildSocketParam | BuildPinParam, string>>

const BUILD_SEARCH_KEYS = [...BUILD_SOCKET_SEARCH_KEYS, ...BUILD_PIN_SEARCH_KEYS]

export function buildSearch(search: Record<string, unknown>): BuildSearch {
  const result: BuildSearch = catalogSlugSearch(search)
  const name = search.name

  if (typeof name === 'string' && name.trim() !== '') {
    result.name = name.trim()
  }

  for (const key of BUILD_SEARCH_KEYS) {
    const value = search[key]
    if (typeof value === 'string' && value.trim() !== '') {
      result[key] = value.trim()
    }
  }

  return result
}
