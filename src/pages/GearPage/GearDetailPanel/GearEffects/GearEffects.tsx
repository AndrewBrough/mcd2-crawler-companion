import type { Effect } from '#/types/data/effect'
import { GearEffectPill } from './GearEffectPill'
import styles from './GearEffects.module.css'

const EFFECT_PIN_CAP = 3

export type GearEffectsProps = {
  effects: Array<Effect>
  archetypeNames: Array<string>
  pinnedSlugs?: ReadonlyArray<string>
  onPinEffect?: (slug: string) => void
}

export function GearEffects({ effects, archetypeNames, pinnedSlugs = [], onPinEffect }: GearEffectsProps) {
  const archetypeTitle = archetypeNames.length ? archetypeNames.join(', ') : undefined
  const pinLimitReached = pinnedSlugs.length >= EFFECT_PIN_CAP

  return (
    <section className={styles.section}>
      <h3 className="heading" title={archetypeTitle}>
        Effects
      </h3>
      {effects.length ? (
        <ul className={styles.list}>
          {effects.map((effect) => (
            <li key={effect.slug}>
              <GearEffectPill
                effect={effect}
                pinned={pinnedSlugs.includes(effect.slug)}
                disabled={Boolean(onPinEffect) && pinLimitReached && !pinnedSlugs.includes(effect.slug)}
                onPin={onPinEffect ? () => onPinEffect(effect.slug) : undefined}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No effects</p>
      )}
    </section>
  )
}
