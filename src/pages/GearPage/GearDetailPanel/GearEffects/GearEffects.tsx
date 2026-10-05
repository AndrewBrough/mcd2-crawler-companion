import { EffectSocket } from '#/components/ui/EffectSocket'
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
  const pinnedEffects = pinnedSlugs.flatMap((slug) => {
    const effect = effects.find((item) => item.slug === slug)
    return effect ? [effect] : []
  })
  const availableEffects = effects.filter((effect) => !pinnedSlugs.includes(effect.slug))
  const emptySockets = Math.max(0, EFFECT_PIN_CAP - pinnedEffects.length)

  return (
    <section className={styles.section}>
      <h3 className="heading" title={archetypeTitle}>
        Effects
      </h3>
      {onPinEffect && effects.length ? (
        <div className={styles.sockets}>
          {pinnedEffects.map((effect) => (
            <EffectSocket
              key={effect.slug}
              effect={effect}
              options={availableEffects}
              onSelect={onPinEffect}
            />
          ))}
          {Array.from({ length: emptySockets }, (_, index) => (
            <EffectSocket
              key={`empty-${index}`}
              options={availableEffects}
              onSelect={onPinEffect}
            />
          ))}
        </div>
      ) : effects.length ? (
        <ul className={styles.list}>
          {effects.map((effect) => (
            <li key={effect.slug}>
              <GearEffectPill effect={effect} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No effects</p>
      )}
    </section>
  )
}
