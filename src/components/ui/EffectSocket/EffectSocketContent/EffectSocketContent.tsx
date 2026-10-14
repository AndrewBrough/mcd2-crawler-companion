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
  const image = (
    <ThumbnailImage catalogKind="effects" slug={effect.slug} size="small" unique={level === 'unique'} />
  )

  return (
    <>
      {level === 'unique' ? <span className={styles.uniqueImage}>{image}</span> : image}
      <span>
        <h5>{effect.name}</h5>
        <p>
          {effect.description ? (
            <EffectDescription effect={effect} level={level} />
          ) : (
            'No description yet.'
          )}
        </p>
      </span>
    </>
  )
}
