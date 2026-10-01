import type { ReactNode } from 'react'
import { CatalogGrid } from '#/components/Catalog'
import { CatalogDetailPanel } from '#/components/CatalogDetailPanel'
import { effectsForGear, uniqueEffectForGear } from '#/lib/catalog/filter-effects'
import type { Effect } from '#/types/data/effect'
import type { Gear } from '#/types/data/gear'
import { GearEffects } from './GearEffects'
import { GearRarityBadge } from './GearRarityBadge'
import { GearUniqueEffect } from './GearUniqueEffect'
import styles from './GearDetailPanel.module.css'

export type GearDetailPanelProps = {
  item: Gear | null
  effects: Array<Effect>
  footer?: ReactNode
}

export function GearDetailPanel({ item, effects, footer }: GearDetailPanelProps) {
  const uniqueEffect = item ? uniqueEffectForGear(effects, item.slug) : null

  return (
    <CatalogDetailPanel
      ariaLabel="Gear details"
      emptyMessage="Select a piece of gear to see its details."
      item={item}
      headingExtra={item ? <GearRarityBadge rarity={item.rarity} /> : null}
    >
      {item ? (
        <>
          {item.rarity === 'unique' ? <GearUniqueEffect effect={uniqueEffect} /> : null}
          <GearEffects effects={effectsForGear(effects, item)} />
          <section className={styles.enchantments}>
            <h3 className={styles.heading}>Enchantments</h3>
            {item.enchantments.length ? (
              <CatalogGrid items={item.enchantments} catalogKind="enchantments" linked />
            ) : (
              <p className={styles.none}>No enchantments</p>
            )}
          </section>
          {footer ? <div className={styles.footer}>{footer}</div> : null}
        </>
      ) : null}
    </CatalogDetailPanel>
  )
}
