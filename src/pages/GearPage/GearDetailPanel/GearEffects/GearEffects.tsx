import { useState } from 'react'
import { EffectSocket } from '#/components/ui/EffectSocket'
import type { Effect } from '#/types/data/effect'
import { GearSectionToggle } from '../GearSectionToggle'
import styles from './GearEffects.module.css'

const EFFECT_PIN_CAP = 3

export type GearEffectsProps = {
  effects: Array<Effect>
  archetypeNames: Array<string>
  pinnedSlugs?: ReadonlyArray<string>
  onPinEffect?: (slug: string, replaceSlug?: string) => void
  uniqueEffect?: Effect | null
  collapsible?: boolean
}

export function GearEffects({
  effects,
  archetypeNames,
  pinnedSlugs = [],
  onPinEffect,
  uniqueEffect = null,
  collapsible = true,
}: GearEffectsProps) {
  const [expanded, setExpanded] = useState(false)
  const archetypeTitle = archetypeNames.length ? archetypeNames.join(', ') : undefined
  const pinnedEffects = pinnedSlugs.flatMap((slug) => {
    const effect = effects.find((item) => item.slug === slug)
    return effect ? [effect] : []
  })
  const availableEffects = effects.filter((effect) => !pinnedSlugs.includes(effect.slug))
  const showEmptySocket = pinnedEffects.length < EFFECT_PIN_CAP && availableEffects.length > 0

  return (
    <section className={styles.section}>
      <GearSectionToggle
        label="Effects"
        heading="Effects"
        headingTitle={archetypeTitle}
        expanded={expanded}
        collapsible={collapsible}
        onToggle={() => setExpanded((open) => !open)}
      >
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
          <div className={styles.sockets}>
            {effects.map((effect) => (
              <EffectSocket key={effect.slug} effect={effect} />
            ))}
          </div>
        ) : null}
        {!uniqueEffect && !effects.length ? <p>No effects</p> : null}
      </GearSectionToggle>
    </section>
  )
}
