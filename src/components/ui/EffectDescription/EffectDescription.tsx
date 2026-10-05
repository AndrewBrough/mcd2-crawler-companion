import { Fragment } from 'react'
import type { Effect } from '#/types/data/effect'
import styles from './EffectDescription.module.css'

export type EffectDescriptionLevel = 1 | 2 | 3 | 'unique'

const levelLabels = {
  1: 'I',
  2: 'II',
  3: 'III',
  unique: 'Unique',
} satisfies Record<EffectDescriptionLevel, string>

export function effectLevelLabel(level: EffectDescriptionLevel): string {
  return levelLabels[level]
}

export type EffectDescriptionProps = {
  effect: Effect
  level?: EffectDescriptionLevel
}

export function EffectDescription({ effect, level }: EffectDescriptionProps) {
  const selected = level
    ? effect.levels.find((entry) => entry.label === levelLabels[level])
    : null
  const parts = effect.description.split(/(X%)/g)

  return parts.map((part, index) => (
    <Fragment key={index}>
      {part !== 'X%' || !selected ? (
        part
      ) : (
        <strong className={styles.value}>{Number(selected.percent)}%</strong>
      )}
    </Fragment>
  ))
}
