import styles from './GearCatalogTypeButton.module.css'

export type GearCatalogTypeButtonProps = {
  label: string
  iconSrc: string
  selected: boolean
  onSelect: () => void
}

export function GearCatalogTypeButton({
  label,
  iconSrc,
  selected,
  onSelect,
}: GearCatalogTypeButtonProps) {
  return (
    <button
      className={selected ? `${styles.button} ${styles.selected}` : styles.button}
      type="button"
      aria-label={label}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <img className={styles.icon} src={iconSrc} alt="" />
    </button>
  )
}
