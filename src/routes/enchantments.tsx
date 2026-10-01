import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { catalogSlugSearch } from '#/lib/catalog/catalog-slug-search'
import { getEnchantments } from '#/lib/catalog/get-enchantments'
import { EnchantmentsPage } from '#/pages/EnchantmentsPage'

export const Route = createFileRoute('/enchantments')({
  validateSearch: catalogSlugSearch,
  loader: () => getEnchantments(),
  component: EnchantmentsRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function EnchantmentsRoute() {
  const enchantments = Route.useLoaderData()
  const { slug } = Route.useSearch()
  return <EnchantmentsPage enchantments={enchantments} initialSlug={slug ?? null} />
}
