import styles from './LevelBadge.module.css'

export type LevelBadgeProps = {
  label: string
  size?: number
}

export function LevelBadge({ label, size }: LevelBadgeProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <span className={styles.badge} style={style}>
      <span className={styles.diamond} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </span>
  )
}
