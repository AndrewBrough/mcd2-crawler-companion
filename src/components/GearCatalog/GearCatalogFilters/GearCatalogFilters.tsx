import { formatGearType } from '#/lib/catalog/format-gear-type'
import type { GearType } from '#/types/data/gear'
import { GearCatalogFilterPill } from '../GearCatalogFilterPill'
import styles from './GearCatalogFilters.module.css'

export type GearCatalogFiltersProps = {
  type: GearType | null
  onRemoveType: () => void
}

export function GearCatalogFilters({ type, onRemoveType }: GearCatalogFiltersProps) {
  if (!type) {
    return null
  }

  const label = formatGearType(type)

  return (
    <ul className={styles.list} aria-label="Applied filters">
      <li>
        <GearCatalogFilterPill label={label} onRemove={onRemoveType} />
      </li>
    </ul>
  )
}
