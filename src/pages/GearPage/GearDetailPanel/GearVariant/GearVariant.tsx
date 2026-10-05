import { CatalogGrid } from '#/components/Catalog'
import type { Gear } from '#/types/data/gear'
import styles from './GearVariant.module.css'

export type GearVariantProps = {
  item: Gear
  onSelect: (slug: string) => void
}

export function GearVariant({ item, onSelect }: GearVariantProps) {
  if (!item.variants.length) {
    return null
  }

  const heading = item.rarity.includes('unique') ? 'Base variant' : 'Unique variant'

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>{heading}</h3>
      <CatalogGrid
        items={item.variants}
        catalogKind="gear"
        onItemSelect={(variant) => onSelect(variant.slug)}
      />
    </section>
  )
}
