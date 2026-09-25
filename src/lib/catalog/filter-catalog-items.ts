export type CatalogSearchItem = {
  slug: string
  name: string
}

export function filterCatalogItems<T extends CatalogSearchItem>(
  items: Array<T>,
  query: string,
  extraText?: (item: T) => Array<string | null | undefined>,
): Array<T> {
  const needle = query.trim().toLowerCase()

  if (!needle) {
    return items
  }

  return items.filter((item) => {
    const haystack = [item.name, item.slug, ...(extraText?.(item) ?? [])]

    return haystack.some((value) => value?.toLowerCase().includes(needle))
  })
}
