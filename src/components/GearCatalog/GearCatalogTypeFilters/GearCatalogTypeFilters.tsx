import { formatGearType } from '#/lib/catalog/format-gear-type'
import type { GearType } from '#/types/data/gear'
import { GearCatalogTypeButton } from './GearCatalogTypeButton'
import styles from './GearCatalogTypeFilters.module.css'

const GEAR_TYPE_ICONS = {
  melee_weapon: '/icons/inventory-icon-melee.png',
  ranged_weapon: '/icons/inventory-icon-ranged.png',
  armor_helmet: '/icons/inventory-icon-helmet.png',
  armor_chest: '/icons/inventory-icon-chest.png',
  armor_leggings: '/icons/inventory-icon-leggings.png',
  armor_boots: '/icons/inventory-icon-boots.png',
  artifact: '/icons/inventory-icon-artifact.png',
  talisman: '/icons/inventory-icon-talisman.png',
} satisfies Record<GearType, string>

export type GearCatalogTypeFiltersProps = {
  value: GearType | null
  types: ReadonlyArray<GearType>
  onChange: (type: GearType | null) => void
  inline?: boolean
}

export function GearCatalogTypeFilters({
  value,
  types,
  onChange,
  inline = false,
}: GearCatalogTypeFiltersProps) {
  return (
    <div className={inline ? styles.inline : styles.row} role="group" aria-label="Filter by gear type">
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
