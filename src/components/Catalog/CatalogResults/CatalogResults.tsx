import { Banner } from '#/components/ui/Banner'
import type { CatalogKind } from '#/types/catalog'
import { CatalogGrid, type CatalogGridItem } from '../CatalogGrid'
import styles from './CatalogResults.module.css'

export type CatalogResultsProps<T extends CatalogGridItem> = {
  items: Array<T>
  catalogKind: CatalogKind
  selectedSlug: string | null
  onItemSelect: (item: T) => void
  onItemAdd?: (item: T) => void
  empty: string
  groupBy?: (item: T) => string
  groupLabel?: (group: string) => string
  groupOrder?: ReadonlyArray<string>
  hideBanner?: (group: string) => boolean
}

export function CatalogResults<T extends CatalogGridItem>({
  items,
  catalogKind,
  selectedSlug,
  onItemSelect,
  onItemAdd,
  empty,
  groupBy,
  groupLabel,
  groupOrder,
  hideBanner,
}: CatalogResultsProps<T>) {
  if (!items.length) {
    return <p>{empty}</p>
  }

  if (!groupBy || !groupLabel || !groupOrder) {
    return (
      <CatalogGrid
        items={items}
        catalogKind={catalogKind}
        selectedSlug={selectedSlug}
        onItemSelect={onItemSelect}
        onItemAdd={onItemAdd}
      />
    )
  }

  const sections = groupOrder.flatMap((id) => {
    const grouped = items.filter((item) => groupBy(item) === id)

    return grouped.length ? [{ id, label: groupLabel(id), items: grouped }] : []
  })

  return (
    <div className={styles.sections}>
      {sections.map((section) => (
        <section key={section.id} className={styles.section}>
          {hideBanner?.(section.id) ? null : <Banner title={section.label} color="dark" />}
          <CatalogGrid
            items={section.items}
            catalogKind={catalogKind}
            selectedSlug={selectedSlug}
            onItemSelect={onItemSelect}
            onItemAdd={onItemAdd}
          />
        </section>
      ))}
    </div>
  )
}
