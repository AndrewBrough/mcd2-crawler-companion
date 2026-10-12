import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import { EnchantmentDescription } from '#/components/ui/EnchantmentDescription'
import type { GearEnchantment } from '#/types/data/enchantment'

export type EnchantmentSocketContentProps = {
  enchantment: GearEnchantment
  level: string
}

export function EnchantmentSocketContent({ enchantment, level }: EnchantmentSocketContentProps) {
  const tier = enchantment.tiers.find((entry) => entry.label === level)

  return (
    <>
      <ThumbnailImage catalogKind="enchantments" slug={enchantment.slug} size="small" />
      <span>
        <h5>{enchantment.name}</h5>
        <p>
          {enchantment.description ? (
            <EnchantmentDescription description={enchantment.description} value={tier?.text} />
          ) : (
            'No description yet.'
          )}
        </p>
      </span>
    </>
  )
}
