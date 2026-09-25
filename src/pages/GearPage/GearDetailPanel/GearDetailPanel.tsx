import { CatalogGrid } from '#/components/Catalog'
import { CatalogDetailPanel } from '#/components/CatalogDetailPanel'
import type { Gear } from '#/types/data/gear'
import styles from './GearDetailPanel.module.css'

export type GearDetailPanelProps = {
  item: Gear | null
}

export function GearDetailPanel({ item }: GearDetailPanelProps) {
  return (
    <CatalogDetailPanel
      ariaLabel="Gear details"
      emptyMessage="Select a piece of gear to see its details."
      item={item}
    >
      {item ? (
        <section className={styles.enchantments}>
          <h3 className={styles.heading}>Enchantments</h3>
          {item.enchantments.length ? (
            <CatalogGrid items={item.enchantments} catalogKind="enchantments" />
          ) : (
            <p className={styles.none}>No enchantments</p>
          )}
        </section>
      ) : null}
    </CatalogDetailPanel>
  )
}
