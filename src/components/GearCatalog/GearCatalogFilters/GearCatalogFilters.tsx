import { formatGearRarity } from '#/lib/catalog/format-gear-rarity'
import { formatGearType } from '#/lib/catalog/format-gear-type'
import type { EnchantmentGearType } from '#/types/data/enchantment'
import type { GearRarity, GearType } from '#/types/data/gear'
import { GearCatalogFilterPill } from '../GearCatalogFilterPill'
import styles from './GearCatalogFilters.module.css'

export type GearCatalogFiltersProps = {
  type: GearType | EnchantmentGearType | null
  onRemoveType: () => void
  rarity?: GearRarity | null
  onRemoveRarity?: () => void
}

export function GearCatalogFilters({
  type,
  onRemoveType,
  rarity = null,
  onRemoveRarity,
}: GearCatalogFiltersProps) {
  if (!type && !rarity) {
    return null
  }

  return (
    <ul className={styles.list} aria-label="Applied filters">
      {type ? (
        <li>
          <GearCatalogFilterPill label={formatGearType(type)} onRemove={onRemoveType} />
        </li>
      ) : null}
      {rarity && onRemoveRarity ? (
        <li>
          <GearCatalogFilterPill label={formatGearRarity(rarity)} onRemove={onRemoveRarity} />
        </li>
      ) : null}
    </ul>
  )
}
