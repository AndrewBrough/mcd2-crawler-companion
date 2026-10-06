import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import type { GearEnchantment } from '#/types/data/enchantment'
import styles from './EnchantmentSocketContent.module.css'

export type EnchantmentSocketContentProps = {
  enchantment: GearEnchantment
}

function displayedText(enchantment: GearEnchantment): string {
  const tier = enchantment.tiers.find((entry) => entry.label === 'III')
  return tier?.text || enchantment.description || 'No description yet.'
}

export function EnchantmentSocketContent({ enchantment }: EnchantmentSocketContentProps) {
  return (
    <>
      <ThumbnailImage catalogKind="enchantments" slug={enchantment.slug} size="small" />
      <span className={styles.title}>{enchantment.name}</span>
      <span className={styles.description}>{displayedText(enchantment)}</span>
    </>
  )
}
