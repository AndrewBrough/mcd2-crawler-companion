import { createElement } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import styles from './GearCatalogSearchToggle.module.css'

export type GearCatalogSearchToggleProps = {
  open: boolean
  onToggle: () => void
}

export function GearCatalogSearchSpacer() {
  return <span className={styles.spacer} aria-hidden="true" />
}

export function GearCatalogSearchToggle({ open, onToggle }: GearCatalogSearchToggleProps) {
  return (
    <button
      className={styles.button}
      type="button"
      aria-label="Effect and archetype search"
      aria-expanded={open}
      onClick={onToggle}
    >
      {createElement('wa-icon', { name: 'angle-down' })}
    </button>
  )
}
