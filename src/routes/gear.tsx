import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { getGear } from '#/lib/catalog/get-gear'
import { GearPage } from '#/pages/GearPage'

export const Route = createFileRoute('/gear')({
  loader: () => getGear(),
  component: GearRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function GearRoute() {
  const gear = Route.useLoaderData()
  return <GearPage gear={gear} />
}
