import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { catalogSlugSearch } from '#/lib/catalog/catalog-slug-search'
import { getEffects } from '#/lib/catalog/get-effects'
import { getGear } from '#/lib/catalog/get-gear'
import { GearPage } from '#/pages/GearPage'

export const Route = createFileRoute('/gear')({
  validateSearch: catalogSlugSearch,
  loader: async () => {
    const [gear, effects] = await Promise.all([getGear(), getEffects()])
    return { gear, effects }
  },
  component: GearRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function GearRoute() {
  const { gear, effects } = Route.useLoaderData()
  const { slug } = Route.useSearch()
  return <GearPage gear={gear} effects={effects} initialSlug={slug ?? null} />
}
