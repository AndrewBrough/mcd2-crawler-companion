import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { catalogSlugSearch } from '#/lib/catalog/catalog-slug-search'
import { getArchetypes } from '#/lib/catalog/get-archetypes'
import { getEffects } from '#/lib/catalog/get-effects'
import { EffectsPage } from '#/pages/EffectsPage'

export const Route = createFileRoute('/effects')({
  validateSearch: catalogSlugSearch,
  loader: async () => {
    const [effects, archetypes] = await Promise.all([getEffects(), getArchetypes()])
    return { effects, archetypes }
  },
  component: EffectsRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function EffectsRoute() {
  const { effects, archetypes } = Route.useLoaderData()
  const { slug } = Route.useSearch()
  return <EffectsPage effects={effects} archetypes={archetypes} initialSlug={slug ?? null} />
}
