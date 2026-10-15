import { useState } from 'react'
import { CatalogBrowsePage } from '#/components/CatalogBrowsePage'
import { PanelBack } from '#/components/ui/PanelBack'
import { useCatalogSlug } from '#/lib/catalog/use-catalog-slug'
import type { Archetype } from '#/types/data/archetype'
import type { Effect } from '#/types/data/effect'
import type { GearType } from '#/types/data/gear'
import { EffectDetailPanel } from './EffectDetailPanel'
import { EffectsCatalog } from './EffectsCatalog'

export type EffectsPageProps = {
  effects: Array<Effect>
  archetypes: Array<Archetype>
  initialSlug?: string | null
}

export function EffectsPage({ effects, archetypes, initialSlug = null }: EffectsPageProps) {
  const [typeFilter, setTypeFilter] = useState<GearType | null>(null)
  const { selectedSlug, selectSlug, clearSlug, query, setQuery } = useCatalogSlug(initialSlug)
  const selected = effects.find((item) => item.slug === selectedSlug) ?? null

  return (
    <CatalogBrowsePage
      title="Effects"
      description="Browse the catalog and inspect an effect."
      detailOpen={selected !== null}
      catalog={
        <EffectsCatalog
          effects={effects}
          archetypes={archetypes}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          selectedSlug={selectedSlug}
          onItemSelect={(item) => selectSlug(item.slug)}
          query={query}
          onQueryChange={setQuery}
        />
      }
      detail={<EffectDetailPanel item={selected} header={<PanelBack onClick={clearSlug} />} />}
    />
  )
}
