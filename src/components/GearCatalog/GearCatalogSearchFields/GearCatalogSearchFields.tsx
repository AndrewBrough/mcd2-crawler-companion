import { CatalogSearchField } from '#/components/Catalog/CatalogSearch/CatalogSearchField'
import { GearCatalogSearchSpacer } from '../GearCatalogSearchToggle'
import styles from './GearCatalogSearchFields.module.css'

export type GearCatalogSearchFieldsProps = {
  effectQuery: string
  onEffectQueryChange: (query: string) => void
  archetypeQuery: string
  onArchetypeQueryChange: (query: string) => void
}

export function GearCatalogSearchFields({
  effectQuery,
  onEffectQueryChange,
  archetypeQuery,
  onArchetypeQueryChange,
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
      <CatalogSearchField
        value={archetypeQuery}
        onChange={onArchetypeQueryChange}
        placeholder="Archetype name"
        label="Search by archetype"
        accessory={<GearCatalogSearchSpacer />}
      />
    </div>
  )
}
