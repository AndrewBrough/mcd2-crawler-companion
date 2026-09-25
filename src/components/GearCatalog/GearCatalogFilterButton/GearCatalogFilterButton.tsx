import styles from './GearCatalogFilterButton.module.css'

export type GearCatalogFilterButtonProps = {
  label: string
  selected: boolean
  onSelect: () => void
}

export function GearCatalogFilterButton({
  label,
  selected,
  onSelect,
}: GearCatalogFilterButtonProps) {
  return (
    <button
      className={selected ? `${styles.button} ${styles.selected}` : styles.button}
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
    >
      {label}
    </button>
  )
}
