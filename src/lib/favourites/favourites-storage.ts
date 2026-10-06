const FAVOURITES_KEY = 'favourites'

export function readFavourites(): Array<string> {
  if (typeof localStorage === 'undefined') {
    return []
  }

  try {
    const raw = localStorage.getItem(FAVOURITES_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === 'string') : []
  } catch {
    return []
  }
}

export function writeFavourites(slugs: Array<string>) {
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(slugs))
}
