import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { BuildSearch } from './build-search'
import { buildStorageKey, deleteBuild, listSavedBuilds, saveBuild, type SavedBuild } from './build-storage'
import { BUILD_SOCKET_SEARCH_KEYS } from './build-socket-params'

function buildSignature(search: BuildSearch): string {
  const name = search.name?.trim() ?? ''
  const sockets = BUILD_SOCKET_SEARCH_KEYS.map((key) => search[key] ?? '').join('|')
  return `${name}|${sockets}`
}

export function useSaveBuild(search: BuildSearch) {
  const navigate = useNavigate()
  const signature = buildSignature(search)
  const searchRef = useRef(search)
  searchRef.current = search
  const [savedBuilds, setSavedBuilds] = useState<Array<SavedBuild>>([])

  useEffect(() => {
    const current = searchRef.current
    saveBuild(current)
    setSavedBuilds(listSavedBuilds(buildStorageKey(current.name)))
  }, [signature])

  function removeSavedBuild(key: string) {
    const currentKey = buildStorageKey(searchRef.current.name)
    deleteBuild(key)

    if (key === currentKey) {
      void navigate({ to: '/', search: {} } as Parameters<typeof navigate>[0])
    }

    setSavedBuilds(listSavedBuilds(key === currentKey ? null : currentKey))
  }

  return { savedBuilds, removeSavedBuild }
}
