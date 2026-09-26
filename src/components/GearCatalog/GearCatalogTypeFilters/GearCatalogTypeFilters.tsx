import { formatGearType } from '#/lib/catalog/format-gear-type'
import type { GearType } from '#/types/data/gear'
import { GearCatalogTypeButton } from './GearCatalogTypeButton'
import styles from './GearCatalogTypeFilters.module.css'

const GEAR_TYPE_ICONS = {
  melee_weapon: '/icons/Inventory_melee.png',
  ranged_weapon: '/icons/Inventory_ranged.png',
  armor_helmet: '/icons/inventory_helmet.png',
  armor_chest: '/icons/inventory_chest.png',
  armor_leggings: '/icons/inventory_leggings.png',
  armor_boots: '/icons/inventory_boots.png',
  artifact: '/icons/inventory_artifact.png',
  talisman: '/icons/Inventory_talisman.png',
} satisfies Record<GearType, string>

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
        <GearCatalogTypeButton
          key={type}
          label={formatGearType(type)}
          iconSrc={GEAR_TYPE_ICONS[type]}
          selected={value === type}
          onSelect={() => onChange(value === type ? null : type)}
        />
      ))}
    </div>
  )
}
