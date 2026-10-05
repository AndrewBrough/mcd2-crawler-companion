import { formatEffectGearSlug } from '#/lib/catalog/format-effect-gear-slug'
import styles from './EffectCategories.module.css'

export type EffectCategoriesProps = {
  gearSlugs: Array<string>
}

export function EffectCategories({ gearSlugs }: EffectCategoriesProps) {
  return (
    <section className={styles.section}>
      <h3 className="heading">Gear</h3>
      {gearSlugs.length ? (
        <p className={styles.value}>{gearSlugs.map(formatEffectGearSlug).join(', ')}</p>
      ) : (
        <p>No gear listed</p>
      )}
    </section>
  )
}
