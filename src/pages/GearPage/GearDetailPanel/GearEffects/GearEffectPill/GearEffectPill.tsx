import { useEffect, useRef, useState } from 'react'
import { EffectDescription } from '#/components/ui/EffectDescription'
import type { Effect } from '#/types/data/effect'
import styles from './GearEffectPill.module.css'

export type GearEffectPillProps = {
  effect: Effect
}

type TooltipPosition = {
  top: number
  left: number
}

export function GearEffectPill({ effect }: GearEffectPillProps) {
  const pillRef = useRef<HTMLSpanElement>(null)
  const [position, setPosition] = useState<TooltipPosition | null>(null)

  useEffect(() => {
    if (!position) {
      return
    }

    const hide = () => setPosition(null)
    window.addEventListener('scroll', hide, true)
    return () => window.removeEventListener('scroll', hide, true)
  }, [position])

  function showTooltip() {
    const rect = pillRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }

    const width = 240
    const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8)
    const top = rect.bottom + 6
    setPosition({ top, left })
  }

  return (
    <>
      <span
        ref={pillRef}
        className={styles.pill}
        tabIndex={0}
        onMouseEnter={showTooltip}
        onMouseLeave={() => setPosition(null)}
        onFocus={showTooltip}
        onBlur={() => setPosition(null)}
      >
        {effect.name}
      </span>
      {position ? (
        <span
          className={styles.tooltip}
          role="tooltip"
          style={{ top: position.top, left: position.left }}
        >
          <p className={styles.description}>
            {effect.description ? <EffectDescription effect={effect} /> : 'No description yet.'}
          </p>
          {effect.levels.length ? (
            <ul className={styles.levels}>
              {effect.levels.map((level) => (
                <li key={level.label}>
                  <span>{level.label}</span>
                  <span>{Number(level.percent)}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>No listed amounts</p>
          )}
        </span>
      ) : null}
    </>
  )
}
