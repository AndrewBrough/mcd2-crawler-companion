import { EffectDescription } from '#/components/ui/EffectDescription'
import type { EffectDescriptionLevel } from '#/components/ui/EffectDescription'
import type { Effect } from '#/types/data/effect'
import styles from './EffectSocketContent.module.css'

export type EffectSocketContentProps = {
  effect: Effect
  level: EffectDescriptionLevel
}

export function EffectSocketContent({ effect, level }: EffectSocketContentProps) {
  return (
    <>
      <span className={styles.title}>{effect.name}</span>
      <span className={styles.description}>
        {effect.description ? (
          <EffectDescription effect={effect} level={level} />
        ) : (
          'No description yet.'
        )}
      </span>
    </>
  )
}
