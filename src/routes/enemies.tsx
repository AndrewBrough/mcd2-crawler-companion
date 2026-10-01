import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { catalogSlugSearch } from '#/lib/catalog/catalog-slug-search'
import { getEnemies } from '#/lib/catalog/get-enemies'
import { EnemiesPage } from '#/pages/EnemiesPage'

export const Route = createFileRoute('/enemies')({
  validateSearch: catalogSlugSearch,
  loader: () => getEnemies(),
  component: EnemiesRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function EnemiesRoute() {
  const enemies = Route.useLoaderData()
  const { slug } = Route.useSearch()
  return <EnemiesPage enemies={enemies} initialSlug={slug ?? null} />
}
