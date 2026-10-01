import type { Effect } from '#/types/data/effect'
import styles from './GearUniqueEffect.module.css'

export type GearUniqueEffectProps = {
  effect: Effect | null
}

export function GearUniqueEffect({ effect }: GearUniqueEffectProps) {
  const uniqueLevel = effect?.levels.find((level) => level.label === 'Unique')

  return (
    <section className={styles.section}>
      <h3 className={styles.label}>Unique Effect</h3>
      <p className={styles.name}>{effect?.name ?? 'Unknown'}</p>
      {effect ? (
        <p className={styles.description}>{effect.description || 'No description yet.'}</p>
      ) : null}
      {uniqueLevel ? <p className={styles.percent}>{Number(uniqueLevel.percent)}%</p> : null}
    </section>
  )
}
