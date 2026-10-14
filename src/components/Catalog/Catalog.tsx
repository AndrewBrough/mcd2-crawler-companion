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
  onItemAdd?: (item: T) => void
  ariaLabel: string
  searchPlaceholder: string
  searchLabel: string
  emptyFiltered: string
  emptyCatalog: string
  extraSearchText?: (item: T) => Array<string | null | undefined>
  toolbar?: ReactNode
  leading?: ReactNode
  query?: string
  onQueryChange?: (query: string) => void
  onSearchClear?: () => void
  searchAccessory?: ReactNode
  searchDetails?: ReactNode
  groupBy?: (item: T) => string
  groupLabel?: (group: string) => string
  groupOrder?: ReadonlyArray<string>
  hideBanner?: (group: string) => boolean
}

export function Catalog<T extends CatalogItem>({
  items,
  catalogKind,
  selectedSlug,
  onItemSelect,
  onItemAdd,
  ariaLabel,
  searchPlaceholder,
  searchLabel,
  emptyFiltered,
  emptyCatalog,
  extraSearchText,
  toolbar,
  leading,
  query: queryProp,
  onQueryChange,
  onSearchClear,
  searchAccessory,
  searchDetails,
  groupBy,
  groupLabel,
  groupOrder,
  hideBanner,
}: CatalogProps<T>) {
  const [internalQuery, setInternalQuery] = useState('')
  const query = queryProp ?? internalQuery
  const setQuery = onQueryChange ?? setInternalQuery
  const visible = filterCatalogItems(items, query, extraSearchText)

  return (
    <aside className={styles.panel} aria-label={ariaLabel}>
      {leading}
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
      <div className={styles.results}>
        <CatalogResults
          items={visible}
          catalogKind={catalogKind}
          selectedSlug={selectedSlug}
          onItemSelect={onItemSelect}
          onItemAdd={onItemAdd}
          empty={items.length ? emptyFiltered : emptyCatalog}
          groupBy={groupBy}
          groupLabel={groupLabel}
          groupOrder={groupOrder}
          hideBanner={hideBanner}
        />
      </div>
    </aside>
  )
}
