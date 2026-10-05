import { Badge } from '#/components/ui/Badge'
import { formatGearRarity } from '#/lib/catalog/format-gear-rarity'
import type { GearRarity } from '#/types/data/gear'
import styles from './GearCatalogRarityFilters.module.css'

export type GearCatalogRarityFiltersProps = {
  value: GearRarity | null
  rarities: ReadonlyArray<GearRarity>
  onChange: (rarity: GearRarity | null) => void
}

export function GearCatalogRarityFilters({
  value,
  rarities,
  onChange,
}: GearCatalogRarityFiltersProps) {
  return (
    <div className={styles.row} role="group" aria-label="Filter by rarity">
      {rarities.map((rarity) => (
        <Badge
          key={rarity}
          color={rarity}
          size="sm"
          selected={value === rarity}
          onClick={() => onChange(value === rarity ? null : rarity)}
        >
          {formatGearRarity(rarity)}
        </Badge>
      ))}
    </div>
  )
}
