import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import styles from './GearRollTooltip.module.css'

export type GearRollLevel = {
  label: string
  value: string
}

export type GearRollTooltipProps = {
  description: string
  levels: Array<GearRollLevel>
  children: ReactNode
}

type TooltipPosition = {
  top: number
  left: number
}

export function GearRollTooltip({ description, levels, children }: GearRollTooltipProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const tooltipId = useId()
  const [position, setPosition] = useState<TooltipPosition | null>(null)
  const text = description.trim()
  const visible = Boolean(text || levels.length)

  useEffect(() => {
    if (!position) {
      return
    }

    const hide = () => setPosition(null)
    window.addEventListener('scroll', hide, true)
    return () => window.removeEventListener('scroll', hide, true)
  }, [position])

  if (!visible) {
    return children
  }

  function showTooltip() {
    const rect = hostRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }

    const width = Math.min(288, window.innerWidth - 16)
    const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8)
    setPosition({ top: rect.bottom + 6, left })
  }

  return (
    <span
      className={styles.host}
      ref={hostRef}
      tabIndex={0}
      aria-describedby={position ? tooltipId : undefined}
      onMouseEnter={showTooltip}
      onMouseLeave={() => setPosition(null)}
      onFocus={showTooltip}
      onBlur={() => setPosition(null)}
    >
      {children}
      {position ? (
        <span className={styles.tooltip} id={tooltipId} role="tooltip" style={{ top: position.top, left: position.left }}>
          {text ? <p className={styles.description}>{text}</p> : null}
          {levels.length ? (
            <ul className={styles.levels}>
              {levels.map((level) => (
                <li key={level.label} className={styles.level}>
                  <span className={styles.label}>{level.label}</span>
                  <span>{level.value}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </span>
      ) : null}
    </span>
  )
}
