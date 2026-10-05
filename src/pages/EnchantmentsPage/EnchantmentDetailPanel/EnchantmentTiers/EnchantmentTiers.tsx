import type { EnchantmentTier } from '#/types/data/enchantment'
import styles from './EnchantmentTiers.module.css'

export type EnchantmentTiersProps = {
  tiers: Array<EnchantmentTier>
}

export function EnchantmentTiers({ tiers }: EnchantmentTiersProps) {
  return (
    <section className={styles.section}>
      <h3 className="heading">Tiers</h3>
      {tiers.length ? (
        <ul className={styles.list}>
          {tiers.map((tier) => (
            <li key={tier.label} className={styles.item}>
              <span className={styles.label}>{tier.label}</span>
              <span>{tier.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tiers listed</p>
      )}
    </section>
  )
}
