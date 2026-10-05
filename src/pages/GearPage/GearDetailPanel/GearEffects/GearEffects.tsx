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
  uniqueEffect?: Effect | null
}

export function GearEffects({
  effects,
  archetypeNames,
  pinnedSlugs = [],
  onPinEffect,
  uniqueEffect = null,
}: GearEffectsProps) {
  const archetypeTitle = archetypeNames.length ? archetypeNames.join(', ') : undefined
  const pinnedEffects = pinnedSlugs.flatMap((slug) => {
    const effect = effects.find((item) => item.slug === slug)
    return effect ? [effect] : []
  })
  const availableEffects = effects.filter((effect) => !pinnedSlugs.includes(effect.slug))
  const showEmptySocket = pinnedEffects.length < EFFECT_PIN_CAP && availableEffects.length > 0

  return (
    <section className={styles.section}>
      <h3 className="heading" title={archetypeTitle}>
        Effects
      </h3>
      {uniqueEffect ? <EffectSocket effect={uniqueEffect} unique /> : null}
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
          {showEmptySocket ? (
            <EffectSocket options={availableEffects} onSelect={onPinEffect} />
          ) : null}
        </div>
      ) : null}
      {!onPinEffect && effects.length ? (
        <ul className={styles.list}>
          {effects.map((effect) => (
            <li key={effect.slug}>
              <GearEffectPill effect={effect} />
            </li>
          ))}
        </ul>
      ) : null}
      {!uniqueEffect && !effects.length ? <p>No effects</p> : null}
    </section>
  )
}
