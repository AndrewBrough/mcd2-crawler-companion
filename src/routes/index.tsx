import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { buildSearch } from '#/lib/build/build-search'
import { getArchetypes } from '#/lib/catalog/get-archetypes'
import { getEffects } from '#/lib/catalog/get-effects'
import { getGear } from '#/lib/catalog/get-gear'
import { BuildPage } from '#/pages/BuildPage'

export const Route = createFileRoute('/')({
  validateSearch: buildSearch,
  loader: async () => {
    const [gear, effects, archetypes] = await Promise.all([getGear(), getEffects(), getArchetypes()])
    return { gear, effects, archetypes }
  },
  component: HomeRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function HomeRoute() {
  const { gear, effects, archetypes } = Route.useLoaderData()
  const search = Route.useSearch()
  return <BuildPage gear={gear} effects={effects} archetypes={archetypes} search={search} />
}
