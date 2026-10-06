import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
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
      <ThumbnailImage catalogKind="effects" slug={effect.slug} size="small" unique={level === 'unique'} />
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
