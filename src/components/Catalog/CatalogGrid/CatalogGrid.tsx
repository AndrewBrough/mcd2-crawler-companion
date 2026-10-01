import { catalogLink } from '#/lib/catalog/catalog-link'
import type { CatalogKind } from '#/types/catalog'
import { CatalogTile } from '../CatalogTile'
import styles from './CatalogGrid.module.css'

export type CatalogGridItem = {
  slug: string
  name: string
}

export type CatalogGridProps<T extends CatalogGridItem> = {
  items: Array<T>
  catalogKind: CatalogKind
  selectedSlug?: string | null
  onItemSelect?: (item: T) => void
  linked?: boolean
}

export function CatalogGrid<T extends CatalogGridItem>({
  items,
  catalogKind,
  selectedSlug = null,
  onItemSelect,
  linked = false,
}: CatalogGridProps<T>) {
  const to = linked ? (catalogLink(catalogKind) ?? undefined) : undefined

  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.slug} className={styles.cell}>
          <CatalogTile
            name={item.name}
            slug={item.slug}
            catalogKind={catalogKind}
            selected={selectedSlug === item.slug}
            to={to}
            onSelect={to || !onItemSelect ? undefined : () => onItemSelect(item)}
          />
        </li>
      ))}
    </ul>
  )
}
