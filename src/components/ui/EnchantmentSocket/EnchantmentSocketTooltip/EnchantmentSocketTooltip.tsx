import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { EnchantmentTier } from '#/types/data/enchantment'
import styles from './EnchantmentSocketTooltip.module.css'

export type EnchantmentSocketTooltipProps = {
  tiers: Array<EnchantmentTier>
  activeLabel: string
  children: ReactNode
}

type TooltipPosition = {
  top: number
  left: number
}

export function EnchantmentSocketTooltip({
  tiers,
  activeLabel,
  children,
}: EnchantmentSocketTooltipProps) {
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

  if (!tiers.length) {
    return children
  }

  function showTooltip() {
    const rect = hostRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }

    const width = 280
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
          <ul className={styles.tiers}>
            {tiers.map((tier) => (
              <li key={tier.label} className={tier.label === activeLabel ? styles.current : undefined}>
                <span className={styles.label}>{tier.label}</span>
                <span>{tier.text}</span>
              </li>
            ))}
          </ul>
        </span>
      ) : null}
    </span>
  )
}
