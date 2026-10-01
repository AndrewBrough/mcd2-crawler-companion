export type CatalogSlugSearch = {
  slug?: string
}

export function catalogSlugSearch(search: Record<string, unknown>): CatalogSlugSearch {
  const slug = search.slug

  if (typeof slug !== 'string' || slug.trim() === '') {
    return {}
  }

  return { slug }
}
