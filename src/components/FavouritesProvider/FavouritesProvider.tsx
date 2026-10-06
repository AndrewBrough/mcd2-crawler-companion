import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readFavourites, writeFavourites } from '#/lib/favourites/favourites-storage'

export type FavouritesContextValue = {
  isFavourite: (slug: string) => boolean
  toggleFavourite: (slug: string) => void
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null)

export type FavouritesProviderProps = {
  children: ReactNode
}

export function FavouritesProvider({ children }: FavouritesProviderProps) {
  const [slugs, setSlugs] = useState<Array<string>>([])

  useEffect(() => {
    setSlugs(readFavourites())

    function sync(event: StorageEvent) {
      if (event.key === 'favourites') {
        setSlugs(readFavourites())
      }
    }

    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const toggleFavourite = useCallback((slug: string) => {
    setSlugs((current) => {
      const next = current.includes(slug) ? current.filter((entry) => entry !== slug) : [...current, slug]
      writeFavourites(next)
      return next
    })
  }, [])

  const value = useMemo<FavouritesContextValue>(
    () => ({
      isFavourite: (slug) => slugs.includes(slug),
      toggleFavourite,
    }),
    [slugs, toggleFavourite],
  )

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export function useFavourites(): FavouritesContextValue {
  const value = useContext(FavouritesContext)

  if (!value) {
    throw new Error('useFavourites must be used within FavouritesProvider')
  }

  return value
}
