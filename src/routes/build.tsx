import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { getGear } from '#/lib/catalog/get-gear'
import { BuildPage } from '#/pages/BuildPage'

export const Route = createFileRoute('/build')({
  loader: () => getGear(),
  component: BuildRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function BuildRoute() {
  const gear = Route.useLoaderData()
  return <BuildPage gear={gear} />
}

