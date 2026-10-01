import type { Effect } from '#/types/data/effect'
import { GearEffectPill } from './GearEffectPill'
import styles from './GearEffects.module.css'

export type GearEffectsProps = {
  effects: Array<Effect>
}

export function GearEffects({ effects }: GearEffectsProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Effects</h3>
      {effects.length ? (
        <ul className={styles.list}>
          {effects.map((effect) => (
            <li key={effect.slug}>
              <GearEffectPill effect={effect} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.none}>No effects</p>
      )}
    </section>
  )
}
