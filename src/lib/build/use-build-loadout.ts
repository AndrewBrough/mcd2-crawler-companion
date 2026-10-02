import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { BUILD_SOCKET_ROWS, type BuildLoadout } from '#/types/data/build'
import type { Gear } from '#/types/data/gear'
import type { BuildSearch } from './build-search'
import { BUILD_SOCKET_PARAMS, BUILD_SOCKET_SEARCH_KEYS } from './build-socket-params'

function loadoutFromSearch(gear: Array<Gear>, search: BuildSearch): BuildLoadout {
  const bySlug = new Map(gear.map((item) => [item.slug, item]))
  const loadout: BuildLoadout = {}

  for (const socket of BUILD_SOCKET_ROWS.flatMap((row) => row.sockets)) {
    const param = BUILD_SOCKET_PARAMS[socket.id as keyof typeof BUILD_SOCKET_PARAMS]
    const slug = search[param]
    const item = slug ? bySlug.get(slug) : undefined
    if (item && item.type === socket.kind) {
      loadout[socket.id] = item
    }
  }

  return loadout
}

function socketKey(search: BuildSearch): string {
  return BUILD_SOCKET_SEARCH_KEYS.map((key) => search[key] ?? '').join('|')
}

export function useBuildLoadout(gear: Array<Gear>, search: BuildSearch) {
  const navigate = useNavigate()
  const searchRef = useRef(search)
  searchRef.current = search
  const [loadout, setLoadout] = useState(() => loadoutFromSearch(gear, search))
  const key = socketKey(search)

  useEffect(() => {
    setLoadout(loadoutFromSearch(gear, searchRef.current))
  }, [gear, key])

  function writeSocket(socketId: string, slug: string | null, catalogSlug?: string) {
    const param = BUILD_SOCKET_PARAMS[socketId as keyof typeof BUILD_SOCKET_PARAMS]
    if (!param) {
      return
    }

    void navigate({
      resetScroll: false,
      search: (previous: BuildSearch) => {
        const next = { ...previous }
        if (catalogSlug) {
          next.slug = catalogSlug
        }
        if (slug) {
          next[param] = slug
        } else {
          delete next[param]
        }
        return next
      },
    } as Parameters<typeof navigate>[0])
  }

  function equip(socketId: string, item: Gear) {
    setLoadout((current) => ({ ...current, [socketId]: item }))
    writeSocket(socketId, item.slug, item.slug)
  }

  function removeSlug(slug: string) {
    setLoadout((current) => {
      const next = { ...current }
      for (const [socketId, item] of Object.entries(next)) {
        if (item.slug === slug) {
          delete next[socketId]
        }
      }
      return next
    })

    void navigate({
      resetScroll: false,
      search: (previous: BuildSearch) => {
        const next = { ...previous }
        for (const param of Object.values(BUILD_SOCKET_PARAMS)) {
          if (next[param] === slug) {
            delete next[param]
          }
        }
        return next
      },
    } as Parameters<typeof navigate>[0])
  }

  function clearSocket(socketId: string) {
    setLoadout((current) => {
      if (!(socketId in current)) {
        return current
      }

      const next = { ...current }
      delete next[socketId]
      return next
    })
    writeSocket(socketId, null)
  }

  return { loadout, equip, clearSocket, removeSlug }
}
