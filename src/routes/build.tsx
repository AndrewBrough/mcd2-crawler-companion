import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { buildSearch } from '#/lib/build/build-search'
import { getEffects } from '#/lib/catalog/get-effects'
import { getGear } from '#/lib/catalog/get-gear'
import { BuildPage } from '#/pages/BuildPage'

export const Route = createFileRoute('/build')({
  validateSearch: buildSearch,
  loader: async () => {
    const [gear, effects] = await Promise.all([getGear(), getEffects()])
    return { gear, effects }
  },
  component: BuildRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function BuildRoute() {
  const { gear, effects } = Route.useLoaderData()
  const search = Route.useSearch()
  return <BuildPage gear={gear} effects={effects} search={search} />
}

