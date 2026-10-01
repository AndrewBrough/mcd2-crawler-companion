import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { CatalogSlugSearch } from './catalog-slug-search'

export function useCatalogSlug(slug: string | null) {
  const navigate = useNavigate()
  const [selectedSlug, setSelectedSlug] = useState<string | null>(slug)
  const [query, setQuery] = useState(slug ?? '')

  useEffect(() => {
    setSelectedSlug(slug)
  }, [slug])

  function selectSlug(next: string) {
    setSelectedSlug(next)
    if (next === slug) {
      return
    }

    void navigate({
      search: (previous: CatalogSlugSearch) => ({
        ...previous,
        slug: next,
      }),
    } as Parameters<typeof navigate>[0])
  }

  function clearSlug() {
    setSelectedSlug(null)
    if (!slug) {
      return
    }

    void navigate({
      search: (previous: CatalogSlugSearch) => {
        const next = { ...previous }
        delete next.slug
        return next
      },
    } as Parameters<typeof navigate>[0])
  }

  return { selectedSlug, setSelectedSlug, selectSlug, clearSlug, query, setQuery }
}
