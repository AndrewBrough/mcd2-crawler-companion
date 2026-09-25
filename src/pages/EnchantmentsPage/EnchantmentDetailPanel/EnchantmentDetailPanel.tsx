import { CatalogDetailPanel } from '#/components/CatalogDetailPanel'
import { formatGearType } from '#/lib/catalog/format-gear-type'
import type { Enchantment } from '#/types/data/enchantment'
import styles from './EnchantmentDetailPanel.module.css'

export type EnchantmentDetailPanelProps = {
  item: Enchantment | null
}

export function EnchantmentDetailPanel({ item }: EnchantmentDetailPanelProps) {
  return (
    <CatalogDetailPanel
      ariaLabel="Enchantment details"
      emptyMessage="Select an enchantment to see its details."
      item={item}
    >
      {item ? (
        <p className={styles.meta}>
          <span className={styles.label}>Gear type</span>
          <span>{formatGearType(item.gearType)}</span>
        </p>
      ) : null}
    </CatalogDetailPanel>
  )
}
