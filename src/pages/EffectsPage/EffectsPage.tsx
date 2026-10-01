import { useState } from 'react'
import { CatalogBrowsePage } from '#/components/CatalogBrowsePage'
import { useCatalogSlug } from '#/lib/catalog/use-catalog-slug'
import type { Effect } from '#/types/data/effect'
import type { GearType } from '#/types/data/gear'
import { EffectDetailPanel } from './EffectDetailPanel'
import { EffectsCatalog } from './EffectsCatalog'

export type EffectsPageProps = {
  effects: Array<Effect>
  initialSlug?: string | null
}

export function EffectsPage({ effects, initialSlug = null }: EffectsPageProps) {
  const [typeFilter, setTypeFilter] = useState<GearType | null>(null)
  const { selectedSlug, selectSlug, query, setQuery } = useCatalogSlug(initialSlug)
  const selected = effects.find((item) => item.slug === selectedSlug) ?? null

  return (
    <CatalogBrowsePage
      kicker="Loot"
      title="Effects"
      description="Browse the catalog and inspect an effect."
      catalog={
        <EffectsCatalog
          effects={effects}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          selectedSlug={selectedSlug}
          onItemSelect={(item) => selectSlug(item.slug)}
          query={query}
          onQueryChange={setQuery}
        />
      }
      detail={<EffectDetailPanel item={selected} />}
    />
  )
}
