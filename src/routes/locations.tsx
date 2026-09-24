import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { getLocations } from '#/lib/catalog/get-locations'
import { LocationsPage } from '#/pages/LocationsPage'

export const Route = createFileRoute('/locations')({
  loader: () => getLocations(),
  component: LocationsRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function LocationsRoute() {
  const locations = Route.useLoaderData()
  return <LocationsPage locations={locations} />
}
