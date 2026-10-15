import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { catalogSlugSearch } from '#/lib/catalog/catalog-slug-search'
import { getArchetypes } from '#/lib/catalog/get-archetypes'
import { getEffects } from '#/lib/catalog/get-effects'
import { getGear } from '#/lib/catalog/get-gear'
import { GearPage } from '#/pages/GearPage'

export const Route = createFileRoute('/gear')({
  validateSearch: catalogSlugSearch,
  loader: async () => {
    const [gear, effects, archetypes] = await Promise.all([getGear(), getEffects(), getArchetypes()])
    return { gear, effects, archetypes }
  },
  component: GearRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function GearRoute() {
  const { gear, effects, archetypes } = Route.useLoaderData()
  const { slug } = Route.useSearch()
  return <GearPage gear={gear} effects={effects} archetypes={archetypes} initialSlug={slug ?? null} />
}
