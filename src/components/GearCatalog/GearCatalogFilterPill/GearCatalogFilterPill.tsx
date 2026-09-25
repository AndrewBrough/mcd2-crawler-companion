import styles from './GearCatalogFilterPill.module.css'

export type GearCatalogFilterPillProps = {
  label: string
  onRemove: () => void
}

export function GearCatalogFilterPill({ label, onRemove }: GearCatalogFilterPillProps) {
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
