import { CatalogSearchField } from '#/components/Catalog/CatalogSearch/CatalogSearchField'
import { ArchetypeDropdown } from '#/components/ui/ArchetypeDropdown'
import type { Archetype } from '#/types/data/archetype'
import { GearCatalogSearchSpacer } from '../GearCatalogSearchToggle'
import styles from './GearCatalogSearchFields.module.css'

export type GearCatalogSearchFieldsProps = {
  effectQuery: string
  onEffectQueryChange: (query: string) => void
  archetypes: Array<Archetype>
  archetypeSlug: string | null
  onArchetypeChange: (slug: string | null) => void
}

export function GearCatalogSearchFields({
  effectQuery,
  onEffectQueryChange,
  archetypes,
  archetypeSlug,
  onArchetypeChange,
}: GearCatalogSearchFieldsProps) {
  return (
    <div className={styles.fields}>
      <CatalogSearchField
        value={effectQuery}
        onChange={onEffectQueryChange}
        placeholder="Effect name"
        label="Search by effect"
        accessory={<GearCatalogSearchSpacer />}
      />
      <div className={styles.row}>
        <ArchetypeDropdown
          archetypes={archetypes}
          value={archetypeSlug}
          onChange={onArchetypeChange}
        />
        <GearCatalogSearchSpacer />
      </div>
    </div>
  )
}
