import { formatGearType } from '#/lib/catalog/format-gear-type'
import { GEAR_TYPES, type GearType } from '#/types/data/gear'
import styles from './GearCatalogTypeSelect.module.css'

export type GearCatalogTypeSelectProps = {
  value: GearType | null
  onChange: (type: GearType | null) => void
}

function parseGearType(value: string): GearType | null {
  return GEAR_TYPES.find((type) => type === value) ?? null
}

export function GearCatalogTypeSelect({ value, onChange }: GearCatalogTypeSelectProps) {
  return (
    <label className={styles.wrap}>
      <span className={styles.label}>Type</span>
      <select
        className={styles.select}
        value={value ?? ''}
        onChange={(event) => onChange(parseGearType(event.target.value))}
        aria-label="Filter by gear type"
      >
        <option value="">All types</option>
        {GEAR_TYPES.map((type) => (
          <option key={type} value={type}>
            {formatGearType(type)}
          </option>
        ))}
      </select>
    </label>
  )
}
