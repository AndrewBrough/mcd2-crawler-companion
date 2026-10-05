import type { Effect } from '#/types/data/effect'
import { GearEffectPill } from './GearEffectPill'
import styles from './GearEffects.module.css'

export type GearEffectsProps = {
  effects: Array<Effect>
  archetypeNames: Array<string>
}

export function GearEffects({ effects, archetypeNames }: GearEffectsProps) {
  const archetypeTitle = archetypeNames.length ? archetypeNames.join(', ') : undefined

  return (
    <section className={styles.section}>
      <h3 className={styles.heading} title={archetypeTitle}>
        Effects
      </h3>
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
