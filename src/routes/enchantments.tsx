import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { getEnchantments } from '#/lib/catalog/get-enchantments'
import { EnchantmentsPage } from '#/pages/EnchantmentsPage'

export const Route = createFileRoute('/enchantments')({
  loader: () => getEnchantments(),
  component: EnchantmentsRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function EnchantmentsRoute() {
  const enchantments = Route.useLoaderData()
  return <EnchantmentsPage enchantments={enchantments} />
}
