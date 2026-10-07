import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LevelBadge } from '#/components/ui/LevelBadge'
import { readSocketTooltipFrame, type SocketTooltipFrame } from '#/components/ui/socketTooltipFrame'
import type { EnchantmentTier } from '#/types/data/enchantment'
import styles from './EnchantmentSocketTooltip.module.css'

export type EnchantmentSocketTooltipProps = {
  tiers: Array<EnchantmentTier>
  activeLabel: string
  children: ReactNode
}

type TooltipPosition = SocketTooltipFrame

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
    const host = hostRef.current
    if (!host) {
      return
    }

    setPosition(readSocketTooltipFrame(host))
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
        <span
          className={styles.tooltip}
          role="tooltip"
          style={{
            top: position.top,
            left: position.left,
            width: position.width,
            paddingLeft: position.paddingLeft,
            paddingRight: position.paddingRight,
          }}
        >
          <ul className={styles.tiers}>
            {tiers.map((tier) => (
              <li
                key={tier.label}
                className={tier.label === activeLabel ? styles.current : undefined}
                style={{ gap: position.gap }}
              >
                <LevelBadge label={tier.label} size={position.badge} />
                <span className={styles.value}>{tier.text}</span>
              </li>
            ))}
          </ul>
        </span>
      ) : null}
    </span>
  )
}
