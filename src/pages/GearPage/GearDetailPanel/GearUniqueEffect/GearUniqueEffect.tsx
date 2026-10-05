import { Badge } from '#/components/ui/Badge'
import { EffectDescription } from '#/components/ui/EffectDescription'
import type { Effect } from '#/types/data/effect'
import styles from './GearUniqueEffect.module.css'

export type GearUniqueEffectProps = {
  effect: Effect | null
}

export function GearUniqueEffect({ effect }: GearUniqueEffectProps) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h3 className={styles.label}>Unique Effect</h3>
        <Badge color="unique">{effect?.name ?? 'Unknown'}</Badge>
      </div>
      {effect ? (
        <p className={styles.description}>
          {effect.description ? (
            <EffectDescription effect={effect} level="unique" />
          ) : (
            'No description yet.'
          )}
        </p>
      ) : null}
    </section>
  )
}
