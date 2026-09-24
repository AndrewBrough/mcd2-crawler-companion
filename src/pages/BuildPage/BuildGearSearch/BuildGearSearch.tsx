import { formatGearType } from '#/lib/catalog/format-gear-type'
import { GEAR_TYPES, type GearType } from '#/types/data/gear'
import styles from './BuildGearSearch.module.css'

export type BuildGearSearchProps = {
  value: string
  onChange: (value: string) => void
  typeFilter: GearType | null
  onTypeFilterChange: (type: GearType | null) => void
}

function parseGearType(value: string): GearType | null {
  return GEAR_TYPES.find((type) => type === value) ?? null
}

export function BuildGearSearch({
  value,
  onChange,
  typeFilter,
  onTypeFilterChange,
}: BuildGearSearchProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.kicker}>Catalog</span>
      <div className={styles.controls}>
        <input
          className={styles.field}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search gear"
          aria-label="Search gear"
        />
        <label className={styles.typeWrap}>
          <span className={styles.typeLabel}>Type</span>
          <select
            className={styles.type}
            value={typeFilter ?? ''}
            onChange={(event) => onTypeFilterChange(parseGearType(event.target.value))}
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
      </div>
    </div>
  )
}
