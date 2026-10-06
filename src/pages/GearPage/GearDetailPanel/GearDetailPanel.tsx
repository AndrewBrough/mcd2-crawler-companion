import type { ReactNode } from 'react'
import { CatalogDetailPanel } from '#/components/CatalogDetailPanel'
import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import { Badge } from '#/components/ui/Badge'
import { Favourite } from '#/components/Favourite'
import { effectsForGear, uniqueEffectForGear } from '#/lib/catalog/filter-effects'
import { formatGearRarity } from '#/lib/catalog/format-gear-rarity'
import type { Effect } from '#/types/data/effect'
import type { Gear } from '#/types/data/gear'
import { GearArchetype } from './GearArchetype'
import { GearEffects } from './GearEffects'
import { GearEnchantments } from './GearEnchantments'
import { GearVariant } from './GearVariant'
import styles from './GearDetailPanel.module.css'

export type GearDetailPanelProps = {
  item: Gear | null
  gear: Array<Gear>
  effects: Array<Effect>
  onVariantSelect: (slug: string) => void
  pinnedEffectSlugs?: Array<string>
  onPinEffect?: (slug: string, replaceSlug?: string) => void
  pinnedEnchantmentSlug?: string | null
  onPinEnchantment?: (slug: string) => void
  footer?: ReactNode
}

export function GearDetailPanel({
  item,
  gear,
  effects,
  onVariantSelect,
  pinnedEffectSlugs,
  onPinEffect,
  pinnedEnchantmentSlug = null,
  onPinEnchantment,
  footer,
}: GearDetailPanelProps) {
  const uniqueEffect = item ? uniqueEffectForGear(effects, item.slug) : null

  return (
    <CatalogDetailPanel
      ariaLabel="Gear details"
      emptyMessage="Select a piece of gear to see its details."
      item={item}
      headingExtra={
        item ? (
          <>
            <Favourite slug={item.slug} name={item.name} />
            {item.rarity.map((rarity) => (
              <Badge key={rarity} color={rarity}>
                {formatGearRarity(rarity)}
              </Badge>
            ))}
          </>
        ) : null
      }
      media={item ? <ThumbnailImage catalogKind="gear" slug={item.slug} size="detail" /> : null}
    >
      {item ? (
        <>
          <GearEnchantments
            enchantments={item.enchantments}
            pinnedSlug={pinnedEnchantmentSlug}
            onPinEnchantment={onPinEnchantment}
          />
          <GearEffects
            effects={effectsForGear(effects, item)}
            archetypeNames={item.archetypeNames}
            pinnedSlugs={pinnedEffectSlugs}
            onPinEffect={onPinEffect}
            uniqueEffect={item.rarity.includes('unique') ? uniqueEffect : null}
          />
          <GearVariant item={item} onSelect={onVariantSelect} />
          <GearArchetype item={item} gear={gear} onSelect={onVariantSelect} />
          {footer ? <div className={styles.footer}>{footer}</div> : null}
        </>
      ) : null}
    </CatalogDetailPanel>
  )
}
