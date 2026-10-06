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
  headingExtra?: ReactNode
  media?: ReactNode
  header?: ReactNode
  children?: ReactNode
}

export function CatalogDetailPanel({
  ariaLabel,
  emptyMessage,
  item,
  headingExtra,
  media,
  header,
  children,
}: CatalogDetailPanelProps) {
  if (!item) {
    return (
      <aside className={styles.panel} aria-label={ariaLabel}>
        <p>{emptyMessage}</p>
      </aside>
    )
  }

  return (
    <aside className={styles.panel} aria-label={ariaLabel}>
      {header}
      <div className={styles.summary}>
        <div className={styles.copy}>
          <div className={styles.heading}>
            <h2 className={styles.name}>{item.name}</h2>
            {headingExtra}
          </div>
          <p>{item.description || 'No description yet.'}</p>
        </div>
        {media}
      </div>
      {children}
    </aside>
  )
}
