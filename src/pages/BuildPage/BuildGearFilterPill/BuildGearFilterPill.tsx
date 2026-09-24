import styles from './BuildGearFilterPill.module.css'

export type BuildGearFilterPillProps = {
  label: string
  onRemove: () => void
}

export function BuildGearFilterPill({ label, onRemove }: BuildGearFilterPillProps) {
  return (
    <button
      className={styles.pill}
      type="button"
      onClick={onRemove}
      aria-label={`Remove ${label} filter`}
    >
      <span>{label}</span>
      <span className={styles.remove} aria-hidden="true">
        ×
      </span>
    </button>
  )
}
