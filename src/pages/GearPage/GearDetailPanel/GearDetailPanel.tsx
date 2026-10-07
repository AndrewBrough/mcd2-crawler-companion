import type { ReactNode } from 'react'
import { CatalogDetailPanel } from '#/components/CatalogDetailPanel'
import { Badge } from '#/components/ui/Badge'
import { Favourite } from '#/components/Favourite'
import { effectPinCapForRarity } from '#/lib/build/use-build-pins'
import { effectsForGear, uniqueEffectForGear } from '#/lib/catalog/filter-effects'
import { formatGearRarity } from '#/lib/catalog/format-gear-rarity'
import type { Effect } from '#/types/data/effect'
import type { Gear } from '#/types/data/gear'
import { GearArchetype } from './GearArchetype'
import { GearDetailMedia } from './GearDetailMedia'
import { GearEffects } from './GearEffects'
import { GearEnchantments } from './GearEnchantments'
import { GearVariant } from './GearVariant'

export type GearDetailPanelProps = {
  item: Gear | null
  gear: Array<Gear>
  effects: Array<Effect>
  onVariantSelect: (slug: string) => void
  pinnedEffectSlugs?: Array<string>
  onPinEffect?: (slug: string, replaceSlug?: string) => void
  pinnedEnchantmentSlug?: string | null
  onPinEnchantment?: (slug: string) => void
  collapsibleRolls?: boolean
  header?: ReactNode
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
  collapsibleRolls = true,
  header,
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
      media={
        item ? (
          <GearDetailMedia
            slug={item.slug}
            baseDps={item.type === 'melee_weapon' ? item.baseDps : null}
          />
        ) : null
      }
      header={header}
    >
      {item ? (
        <>
          {item.type === 'artifact' || item.type === 'talisman' ? null : (
            <GearEnchantments
              enchantments={item.enchantments}
              pinnedSlug={pinnedEnchantmentSlug}
              onPinEnchantment={onPinEnchantment}
              collapsible={collapsibleRolls}
            />
          )}
          <GearEffects
            effects={effectsForGear(effects, item)}
            archetypeNames={item.archetypeNames}
            pinnedSlugs={pinnedEffectSlugs}
            onPinEffect={onPinEffect}
            uniqueEffect={item.rarity.includes('unique') ? uniqueEffect : null}
            collapsible={collapsibleRolls}
            pinCap={effectPinCapForRarity(item.rarity)}
          />
          {item.type === 'artifact' || item.type === 'talisman' ? null : (
            <GearVariant item={item} onSelect={onVariantSelect} />
          )}
          <GearArchetype item={item} gear={gear} onSelect={onVariantSelect} />
        </>
      ) : null}
    </CatalogDetailPanel>
  )
}
