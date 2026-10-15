import { createElement } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import styles from './GearCatalogSearchToggle.module.css'

export type GearCatalogSearchToggleProps = {
  open: boolean
  onToggle: () => void
  label?: string
}

export function GearCatalogSearchSpacer() {
  return <span className={styles.spacer} aria-hidden="true" />
}

export function GearCatalogSearchToggle({
  open,
  onToggle,
  label = 'Description, effect, and archetype search',
}: GearCatalogSearchToggleProps) {
  return (
    <button
      className={styles.button}
      type="button"
      aria-label={label}
      aria-expanded={open}
      onClick={onToggle}
    >
      {createElement('wa-icon', { name: 'angle-down' })}
    </button>
  )
}
