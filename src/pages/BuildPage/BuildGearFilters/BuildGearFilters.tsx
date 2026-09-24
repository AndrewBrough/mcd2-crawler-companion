import { formatGearType } from '#/lib/catalog/format-gear-type'
import type { GearType } from '#/types/data/gear'
import { BuildGearFilterPill } from '../BuildGearFilterPill'
import styles from './BuildGearFilters.module.css'

export type BuildGearFiltersProps = {
  type: GearType | null
  onRemoveType: () => void
}

export function BuildGearFilters({ type, onRemoveType }: BuildGearFiltersProps) {
  if (!type) {
    return null
  }

  const label = formatGearType(type)

  return (
    <ul className={styles.list} aria-label="Applied filters">
      <li>
        <BuildGearFilterPill label={label} onRemove={onRemoveType} />
      </li>
    </ul>
  )
}
