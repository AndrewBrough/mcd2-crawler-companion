import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { EffectLevel } from '#/types/data/effect'
import styles from './EffectSocketTooltip.module.css'

export type EffectSocketTooltipProps = {
  levels: Array<EffectLevel>
  activeLabel: string
  children: ReactNode
}

type TooltipPosition = {
  top: number
  left: number
}

export function EffectSocketTooltip({ levels, activeLabel, children }: EffectSocketTooltipProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const [position, setPosition] = useState<TooltipPosition | null>(null)

  useEffect(() => {
    if (!position) {
      return
    }

    const hide = () => setPosition(null)
    window.addEventListener('scroll', hide, true)
    return () => window.removeEventListener('scroll', hide, true)
  }, [position])

  if (!levels.length) {
    return children
  }

  function showTooltip() {
    const rect = hostRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }

    const width = 192
    const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8)
    setPosition({ top: rect.bottom + 6, left })
  }

  return (
    <span
      className={styles.host}
      ref={hostRef}
      onMouseEnter={showTooltip}
      onMouseLeave={() => setPosition(null)}
      onFocus={showTooltip}
      onBlur={() => setPosition(null)}
    >
      {children}
      {position ? (
        <span className={styles.tooltip} role="tooltip" style={{ top: position.top, left: position.left }}>
          <ul className={styles.levels}>
            {levels.map((level) => (
              <li key={level.label} className={level.label === activeLabel ? styles.current : undefined}>
                <span>{level.label}</span>
                <span>{Number(level.percent)}%</span>
              </li>
            ))}
          </ul>
        </span>
      ) : null}
    </span>
  )
}
