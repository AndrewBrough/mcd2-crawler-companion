import { useState } from 'react'
import { Catalog } from '#/components/Catalog'
import { GearCatalogSearchSpacer, GearCatalogSearchToggle } from '#/components/GearCatalog/GearCatalogSearchToggle'
import { GearCatalogTypeFilters } from '#/components/GearCatalog/GearCatalogTypeFilters'
import { ArchetypeDropdown } from '#/components/ui/ArchetypeDropdown'
import { filterEffects } from '#/lib/catalog/filter-effects'
import { formatEffectGearSlug } from '#/lib/catalog/format-effect-gear-slug'
import type { Archetype } from '#/types/data/archetype'
import type { Effect } from '#/types/data/effect'
import { GEAR_TYPES, type GearType } from '#/types/data/gear'
import styles from './EffectsCatalog.module.css'

export type EffectsCatalogProps = {
  effects: Array<Effect>
  archetypes: Array<Archetype>
  typeFilter: GearType | null
  onTypeFilterChange: (type: GearType | null) => void
  selectedSlug: string | null
  onItemSelect: (item: Effect) => void
  query: string
  onQueryChange: (query: string) => void
}

export function EffectsCatalog({
  effects,
  archetypes,
  typeFilter,
  onTypeFilterChange,
  selectedSlug,
  onItemSelect,
  query,
  onQueryChange,
}: EffectsCatalogProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [archetypeSlug, setArchetypeSlug] = useState<string | null>(null)
  const archetype = archetypes.find((item) => item.slug === archetypeSlug) ?? null
  const items = filterEffects(effects, typeFilter, archetype)

  return (
    <Catalog
      items={items}
      catalogKind="effects"
      selectedSlug={selectedSlug}
      onItemSelect={onItemSelect}
      ariaLabel="Effects catalog"
      searchPlaceholder="Search effects"
      searchLabel="Search effects"
      emptyFiltered="No effects match that search."
      emptyCatalog="No effects in the catalog yet."
      extraSearchText={(item) => [
        item.description,
        ...item.gearSlugs.map(formatEffectGearSlug),
        ...item.uniqueGear.map((gear) => gear.name),
      ]}
      query={query}
      onQueryChange={onQueryChange}
      searchAccessory={
        <GearCatalogSearchToggle
          open={filtersOpen}
          label="Archetype search"
          onToggle={() => setFiltersOpen((open) => !open)}
        />
      }
      searchDetails={
        filtersOpen ? (
          <div className={styles.row}>
            <ArchetypeDropdown
              archetypes={archetypes}
              value={archetypeSlug}
              onChange={setArchetypeSlug}
            />
            <GearCatalogSearchSpacer />
          </div>
        ) : null
      }
      toolbar={
        <GearCatalogTypeFilters
          value={typeFilter}
          types={GEAR_TYPES}
          onChange={onTypeFilterChange}
        />
      }
    />
  )
}
