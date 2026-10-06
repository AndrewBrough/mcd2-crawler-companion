import { Badge } from '#/components/ui/Badge'
import type { BadgeColor } from '#/components/ui/Badge'
import { GEAR_RARITY_FILTERS, type GearRarityFilter } from '#/types/data/gear'
import styles from './GearCatalogRarityFilters.module.css'

const rarityFilterColor = {
  basic: 'common',
  unique: 'unique',
} as const satisfies Record<GearRarityFilter, BadgeColor>

const rarityFilterLabel = {
  basic: 'Basic',
  unique: 'Unique',
} as const satisfies Record<GearRarityFilter, string>

export type GearCatalogRarityFiltersProps = {
  value: GearRarityFilter | null
  onChange: (rarity: GearRarityFilter | null) => void
}

export function GearCatalogRarityFilters({ value, onChange }: GearCatalogRarityFiltersProps) {
  return (
    <div className={styles.row} role="group" aria-label="Filter by rarity">
      {GEAR_RARITY_FILTERS.map((rarity) => (
        <Badge
          key={rarity}
          color={rarityFilterColor[rarity]}
          size="sm"
          selected={value === rarity}
          onClick={() => onChange(value === rarity ? null : rarity)}
        >
          {rarityFilterLabel[rarity]}
        </Badge>
      ))}
    </div>
  )
}
