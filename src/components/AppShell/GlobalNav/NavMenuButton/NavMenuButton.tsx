import { createElement } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import styles from './NavMenuButton.module.css'

export type NavMenuButtonProps = {
  open: boolean
  onToggle: () => void
}

export function NavMenuButton({ open, onToggle }: NavMenuButtonProps) {
  return (
    <button
      className={styles.button}
      type="button"
      aria-expanded={open}
      aria-controls="site-menu"
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
    >
      {createElement('wa-icon', { name: 'bars' })}
    </button>
  )
}
