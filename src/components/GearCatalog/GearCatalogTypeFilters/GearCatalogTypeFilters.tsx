import { formatGearType } from '#/lib/catalog/format-gear-type'
import type { GearType } from '#/types/data/gear'
import { GearCatalogFilterButton } from '../GearCatalogFilterButton'
import styles from './GearCatalogTypeFilters.module.css'

export type GearCatalogTypeFiltersProps = {
  value: GearType | null
  types: ReadonlyArray<GearType>
  onChange: (type: GearType | null) => void
}

export function GearCatalogTypeFilters({
  value,
  types,
  onChange,
}: GearCatalogTypeFiltersProps) {
  return (
    <div className={styles.row} role="group" aria-label="Filter by gear type">
      {types.map((type) => (
        <GearCatalogFilterButton
          key={type}
          label={formatGearType(type)}
          selected={value === type}
          onSelect={() => onChange(value === type ? null : type)}
        />
      ))}
    </div>
  )
}
