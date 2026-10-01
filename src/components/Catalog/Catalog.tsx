import { useState, type ReactNode } from 'react'
import { filterCatalogItems } from '#/lib/catalog/filter-catalog-items'
import type { CatalogKind } from '#/types/catalog'
import { CatalogGrid, type CatalogGridItem } from './CatalogGrid'
import { CatalogSearch } from './CatalogSearch'
import styles from './Catalog.module.css'

export type CatalogItem = CatalogGridItem

export type CatalogProps<T extends CatalogItem> = {
  items: Array<T>
  catalogKind: CatalogKind
  selectedSlug: string | null
  onItemSelect: (item: T) => void
  ariaLabel: string
  searchPlaceholder: string
  searchLabel: string
  emptyFiltered: string
  emptyCatalog: string
  extraSearchText?: (item: T) => Array<string | null | undefined>
  toolbar?: ReactNode
  query?: string
  onQueryChange?: (query: string) => void
}

export function Catalog<T extends CatalogItem>({
  items,
  catalogKind,
  selectedSlug,
  onItemSelect,
  ariaLabel,
  searchPlaceholder,
  searchLabel,
  emptyFiltered,
  emptyCatalog,
  extraSearchText,
  toolbar,
  query: queryProp,
  onQueryChange,
}: CatalogProps<T>) {
  const [internalQuery, setInternalQuery] = useState('')
  const query = queryProp ?? internalQuery
  const setQuery = onQueryChange ?? setInternalQuery
  const visible = filterCatalogItems(items, query, extraSearchText)

  return (
    <aside className={styles.panel} aria-label={ariaLabel}>
      <CatalogSearch
        value={query}
        onChange={setQuery}
        placeholder={searchPlaceholder}
        label={searchLabel}
      >
        {toolbar}
      </CatalogSearch>
      <div className={styles.results}>
        {visible.length ? (
          <CatalogGrid
            items={visible}
            catalogKind={catalogKind}
            selectedSlug={selectedSlug}
            onItemSelect={onItemSelect}
          />
        ) : (
          <p className={styles.empty}>{items.length ? emptyFiltered : emptyCatalog}</p>
        )}
      </div>
    </aside>
  )
}
