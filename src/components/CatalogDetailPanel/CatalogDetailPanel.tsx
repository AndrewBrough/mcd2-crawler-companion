import type { ReactNode } from 'react'
import styles from './CatalogDetailPanel.module.css'

export type CatalogDetailItem = {
  name: string
  description: string
}

export type CatalogDetailPanelProps = {
  ariaLabel: string
  emptyMessage: string
  item: CatalogDetailItem | null
  children?: ReactNode
}

export function CatalogDetailPanel({
  ariaLabel,
  emptyMessage,
  item,
  children,
}: CatalogDetailPanelProps) {
  if (!item) {
    return (
      <aside className={styles.panel} aria-label={ariaLabel}>
        <p className={styles.empty}>{emptyMessage}</p>
      </aside>
    )
  }

  return (
    <aside className={styles.panel} aria-label={ariaLabel}>
      <p className={styles.kicker}>Details</p>
      <h2 className={styles.name}>{item.name}</h2>
      <p className={styles.description}>{item.description || 'No description yet.'}</p>
      {children}
    </aside>
  )
}
