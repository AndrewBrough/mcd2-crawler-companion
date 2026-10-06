import type { ReactNode } from 'react'
import { PageHeader } from '#/components/PageHeader'
import { Layout } from '#/components/ui/Layout'

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
    <Layout columns="split" header={<PageHeader title={title} description={description} />}>
      {catalog}
      {detail}
    </Layout>
  )
}
