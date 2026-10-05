import type { BuildSearch } from './build-search'
import { BUILD_SOCKET_SEARCH_KEYS } from './build-socket-params'

const BUILD_KEY_PREFIX = 'build-'

export type SavedBuild = {
  key: string
  url: string
  current: boolean
}

export function savedBuildLabel(key: string): string {
  return key.slice(BUILD_KEY_PREFIX.length).replaceAll('+', ' ')
}

export function listSavedBuilds(currentKey: string | null): Array<SavedBuild> {
  const builds: Array<SavedBuild> = []

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)
    if (!key?.startsWith(BUILD_KEY_PREFIX)) {
      continue
    }

    const url = localStorage.getItem(key)
    if (url) {
      builds.push({ key, url, current: key === currentKey })
    }
  }

  return builds.sort((left, right) => savedBuildLabel(left.key).localeCompare(savedBuildLabel(right.key)))
}

export function buildStorageKey(name: string | undefined): string | null {
  const label = name?.trim()
  if (!label) {
    return null
  }

  return `${BUILD_KEY_PREFIX}${label.replaceAll(' ', '+')}`
}

export function buildShareUrl(search: BuildSearch, origin: string): string {
  const params = new URLSearchParams()
  const name = search.name?.trim()

  if (name) {
    params.set('name', name)
  }

  for (const key of BUILD_SOCKET_SEARCH_KEYS) {
    const value = search[key]
    if (value) {
      params.set(key, value)
    }
  }

  const query = params.toString()
  const path = query ? `/?${query}` : '/'
  return new URL(path, origin).toString()
}

export function saveBuild(search: BuildSearch): void {
  const key = buildStorageKey(search.name)
  if (!key) {
    return
  }

  localStorage.setItem(key, buildShareUrl(search, window.location.origin))
}

export function deleteBuild(key: string): void {
  localStorage.removeItem(key)
}
