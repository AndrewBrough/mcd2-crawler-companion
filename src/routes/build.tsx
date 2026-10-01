import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { buildSearch } from '#/lib/build/build-search'
import { getGear } from '#/lib/catalog/get-gear'
import { BuildPage } from '#/pages/BuildPage'

export const Route = createFileRoute('/build')({
  validateSearch: buildSearch,
  loader: () => getGear(),
  component: BuildRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function BuildRoute() {
  const gear = Route.useLoaderData()
  const { slug, name } = Route.useSearch()
  return <BuildPage gear={gear} initialSlug={slug ?? null} initialName={name ?? null} />
}

