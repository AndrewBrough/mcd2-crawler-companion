import type { ReactNode } from 'react'
import { CatalogGrid } from '#/components/Catalog'
import { CatalogDetailPanel } from '#/components/CatalogDetailPanel'
import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import { Badge } from '#/components/ui/Badge'
import { effectsForGear, uniqueEffectForGear } from '#/lib/catalog/filter-effects'
import { formatGearRarity } from '#/lib/catalog/format-gear-rarity'
import type { Effect } from '#/types/data/effect'
import type { Gear } from '#/types/data/gear'
import { GearEffects } from './GearEffects'
import { GearUniqueEffect } from './GearUniqueEffect'
import { GearVariant } from './GearVariant'
import styles from './GearDetailPanel.module.css'

export type GearDetailPanelProps = {
  item: Gear | null
  effects: Array<Effect>
  onVariantSelect: (slug: string) => void
  footer?: ReactNode
}

export function GearDetailPanel({ item, effects, onVariantSelect, footer }: GearDetailPanelProps) {
  const uniqueEffect = item ? uniqueEffectForGear(effects, item.slug) : null

  return (
    <CatalogDetailPanel
      ariaLabel="Gear details"
      emptyMessage="Select a piece of gear to see its details."
      item={item}
      headingExtra={
        item
          ? item.rarity.map((rarity) => (
              <Badge key={rarity} color={rarity}>
                {formatGearRarity(rarity)}
              </Badge>
            ))
          : null
      }
      media={item ? <ThumbnailImage catalogKind="gear" slug={item.slug} size="detail" /> : null}
    >
      {item ? (
        <>
          {item.rarity.includes('unique') ? <GearUniqueEffect effect={uniqueEffect} /> : null}
          <GearEffects
            effects={effectsForGear(effects, item)}
            archetypeNames={item.archetypeNames}
          />
          <section className={styles.enchantments}>
            <h3 className="heading">Enchantments</h3>
            {item.enchantments.length ? (
              <CatalogGrid items={item.enchantments} catalogKind="enchantments" linked />
            ) : (
              <p>No enchantments</p>
            )}
          </section>
          <GearVariant item={item} onSelect={onVariantSelect} />
          {footer ? <div className={styles.footer}>{footer}</div> : null}
        </>
      ) : null}
    </CatalogDetailPanel>
  )
}
