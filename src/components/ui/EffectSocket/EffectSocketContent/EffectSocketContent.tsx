import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import { EffectDescription } from '#/components/ui/EffectDescription'
import type { EffectDescriptionLevel } from '#/components/ui/EffectDescription'
import type { Effect } from '#/types/data/effect'

export type EffectSocketContentProps = {
  effect: Effect
  level: EffectDescriptionLevel
}

export function EffectSocketContent({ effect, level }: EffectSocketContentProps) {
  return (
    <>
      <ThumbnailImage catalogKind="effects" slug={effect.slug} size="small" unique={level === 'unique'} />
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
