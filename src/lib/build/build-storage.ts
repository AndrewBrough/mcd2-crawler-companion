import type { BuildSearch } from './build-search'
import { BUILD_SOCKET_SEARCH_KEYS } from './build-socket-params'

export const BUILD_UNTITLED_NAME = 'Untitled build'

const BUILD_KEY_PREFIX = 'build-'

export type SavedBuild = {
  key: string
  url: string
}

export function savedBuildLabel(key: string): string {
  return key.slice(BUILD_KEY_PREFIX.length).replaceAll('+', ' ')
}

export function listSavedBuilds(currentKey: string): Array<SavedBuild> {
  const builds: Array<SavedBuild> = []

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)
    if (!key?.startsWith(BUILD_KEY_PREFIX) || key === currentKey) {
      continue
    }

    const url = localStorage.getItem(key)
    if (url) {
      builds.push({ key, url })
    }
  }

  return builds.sort((left, right) => savedBuildLabel(left.key).localeCompare(savedBuildLabel(right.key)))
}

export function buildStorageKey(name: string | undefined): string {
  const label = name?.trim() || BUILD_UNTITLED_NAME
  return `${BUILD_KEY_PREFIX}${label.replaceAll(' ', '+')}`
}

export function buildShareUrl(search: BuildSearch, origin: string): string {
  const params = new URLSearchParams()
  const name = search.name?.trim()

  if (name && name !== BUILD_UNTITLED_NAME) {
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
  localStorage.setItem(buildStorageKey(search.name), buildShareUrl(search, window.location.origin))
}
