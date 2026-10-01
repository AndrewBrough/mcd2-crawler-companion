import { useEffect, useRef, useState } from 'react'
import type { BuildSearch } from './build-search'
import { buildStorageKey, listSavedBuilds, saveBuild, type SavedBuild } from './build-storage'
import { BUILD_SOCKET_SEARCH_KEYS } from './build-socket-params'

function buildSignature(search: BuildSearch): string {
  const name = search.name?.trim() ?? ''
  const sockets = BUILD_SOCKET_SEARCH_KEYS.map((key) => search[key] ?? '').join('|')
  return `${name}|${sockets}`
}

export function useSaveBuild(search: BuildSearch) {
  const signature = buildSignature(search)
  const searchRef = useRef(search)
  searchRef.current = search
  const [savedBuilds, setSavedBuilds] = useState<Array<SavedBuild>>([])

  useEffect(() => {
    const current = searchRef.current
    saveBuild(current)
    setSavedBuilds(listSavedBuilds(buildStorageKey(current.name)))
  }, [signature])

  return savedBuilds
}
