import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { BuildSearch } from './build-search'

const UNTITLED = 'Untitled build'

export function useBuildName(name: string | null) {
  const navigate = useNavigate()
  const saved = name?.trim() || UNTITLED
  const [title, setTitle] = useState(saved)

  useEffect(() => {
    setTitle(saved)
  }, [saved])

  function saveName() {
    const next = title.trim()
    const stored = next && next !== UNTITLED ? next : undefined

    void navigate({
      search: (previous: BuildSearch) => {
        const search = { ...previous }
        if (stored) {
          search.name = stored
        } else {
          delete search.name
        }
        return search
      },
    } as Parameters<typeof navigate>[0])

    if (!stored) {
      setTitle(UNTITLED)
    }
  }

  return { title, setTitle, dirty: title.trim() !== saved, saveName }
}
