import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { getEnemies } from '#/lib/catalog/get-enemies'
import { EnemiesPage } from '#/pages/EnemiesPage'

export const Route = createFileRoute('/enemies')({
  loader: () => getEnemies(),
  component: EnemiesRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function EnemiesRoute() {
  const enemies = Route.useLoaderData()
  return <EnemiesPage enemies={enemies} />
}
