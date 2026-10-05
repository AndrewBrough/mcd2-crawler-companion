import type { ReactNode } from 'react'
import { PageHeader } from '#/components/PageHeader'
import styles from './CatalogBrowsePage.module.css'

export type CatalogBrowsePageProps = {
  title: string
  description: string
  catalog: ReactNode
  detail: ReactNode
}

export function CatalogBrowsePage({
  title,
  description,
  catalog,
  detail,
}: CatalogBrowsePageProps) {
  return (
    <div className={styles.page}>
      <PageHeader title={title} description={description} />
      <div className={styles.layout}>
        {catalog}
        {detail}
      </div>
    </div>
  )
}
