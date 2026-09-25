import { formatGearType } from '#/lib/catalog/format-gear-type'
import type { EnchantmentGearType } from '#/types/data/enchantment'
import type { GearType } from '#/types/data/gear'
import styles from './GearCatalogTypeSelect.module.css'

export type GearCatalogTypeSelectProps<
  Type extends GearType | EnchantmentGearType,
> = {
  value: Type | null
  types: ReadonlyArray<Type>
  onChange: (type: Type | null) => void
}

export function GearCatalogTypeSelect<
  Type extends GearType | EnchantmentGearType,
>({ value, types, onChange }: GearCatalogTypeSelectProps<Type>) {
  return (
    <label className={styles.wrap}>
      <span className={styles.label}>Type</span>
      <select
        className={styles.select}
        value={value ?? ''}
        onChange={(event) =>
          onChange(types.find((type) => type === event.target.value) ?? null)
        }
        aria-label="Filter by gear type"
      >
        <option value="">All types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {formatGearType(type)}
          </option>
        ))}
      </select>
    </label>
  )
}
