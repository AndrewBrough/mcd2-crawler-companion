import { useState, type ReactNode } from 'react'
import { filterCatalogItems } from '#/lib/catalog/filter-catalog-items'
import type { CatalogKind } from '#/types/catalog'
import type { CatalogGridItem } from './CatalogGrid'
import { CatalogResults } from './CatalogResults'
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
  onSearchClear?: () => void
  searchAccessory?: ReactNode
  searchDetails?: ReactNode
  limitResults?: boolean
  groupBy?: (item: T) => string
  groupLabel?: (group: string) => string
  groupOrder?: ReadonlyArray<string>
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
  onSearchClear,
  searchAccessory,
  searchDetails,
  limitResults = false,
  groupBy,
  groupLabel,
  groupOrder,
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
        onClear={onSearchClear}
        placeholder={searchPlaceholder}
        label={searchLabel}
        accessory={searchAccessory}
        details={searchDetails}
      >
        {toolbar}
      </CatalogSearch>
      <div className={limitResults ? `${styles.results} ${styles.limited}` : styles.results}>
        <CatalogResults
          items={visible}
          catalogKind={catalogKind}
          selectedSlug={selectedSlug}
          onItemSelect={onItemSelect}
          empty={items.length ? emptyFiltered : emptyCatalog}
          groupBy={groupBy}
          groupLabel={groupLabel}
          groupOrder={groupOrder}
        />
      </div>
    </aside>
  )
}
