import type { ReactNode } from 'react'
import styles from './Badge.module.css'

export const BADGE_COLORS = ['common', 'rare', 'special', 'unique'] as const

export type BadgeColor = (typeof BADGE_COLORS)[number]

export type BadgeSize = 'sm' | 'default'

export type BadgeProps = {
  color: BadgeColor
  size?: BadgeSize
  selected?: boolean
  children: ReactNode
  onClick?: () => void
}

export function Badge({
  color,
  size = 'default',
  selected = false,
  children,
  onClick,
}: BadgeProps) {
  const className = [
    styles.badge,
    styles[color],
    size === 'sm' ? styles.sm : styles.default,
    selected ? styles.selected : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (onClick) {
    return (
      <button className={className} type="button" aria-pressed={selected} onClick={onClick}>
        {children}
      </button>
    )
  }

  return <span className={className}>{children}</span>
}
