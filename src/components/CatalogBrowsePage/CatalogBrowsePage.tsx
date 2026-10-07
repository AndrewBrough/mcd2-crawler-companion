import type { ReactNode } from 'react'
import { PageHeader } from '#/components/PageHeader'
import { Layout, type LayoutMobilePanel } from '#/components/ui/Layout'

export type CatalogBrowsePageProps = {
  title: string
  description: string
  catalog: ReactNode
  detail: ReactNode
  detailOpen?: boolean
}

export function CatalogBrowsePage({
  title,
  description,
  catalog,
  detail,
  detailOpen,
}: CatalogBrowsePageProps) {
  const mobilePanel: LayoutMobilePanel | undefined =
    detailOpen === undefined ? undefined : detailOpen ? 'secondary' : 'primary'

  return (
    <Layout
      columns="split"
      mobilePanel={mobilePanel}
      header={<PageHeader title={title} description={description} />}
    >
      {catalog}
      {detail}
    </Layout>
  )
}
