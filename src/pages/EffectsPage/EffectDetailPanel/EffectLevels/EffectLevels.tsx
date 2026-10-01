import type { EffectLevel } from '#/types/data/effect'
import styles from './EffectLevels.module.css'

export type EffectLevelsProps = {
  levels: Array<EffectLevel>
}

export function EffectLevels({ levels }: EffectLevelsProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Effectiveness</h3>
      {levels.length ? (
        <ul className={styles.list}>
          {levels.map((level) => (
            <li key={level.label} className={styles.item}>
              <span>{level.label}</span>
              <span>{Number(level.percent)}%</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.none}>No listed amounts</p>
      )}
    </section>
  )
}
