import { createFileRoute } from '@tanstack/react-router'
import { CatalogPending } from '#/components/CatalogPending'
import { CatalogRouteError } from '#/components/CatalogRouteError'
import { catalogSlugSearch } from '#/lib/catalog/catalog-slug-search'
import { getEffects } from '#/lib/catalog/get-effects'
import { EffectsPage } from '#/pages/EffectsPage'

export const Route = createFileRoute('/effects')({
  validateSearch: catalogSlugSearch,
  loader: () => getEffects(),
  component: EffectsRoute,
  errorComponent: CatalogRouteError,
  pendingComponent: CatalogPending,
})

function EffectsRoute() {
  const effects = Route.useLoaderData()
  const { slug } = Route.useSearch()
  return <EffectsPage effects={effects} initialSlug={slug ?? null} />
}
