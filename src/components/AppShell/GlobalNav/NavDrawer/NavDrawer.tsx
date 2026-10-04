import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, type NavLinkProps } from '../NavLink'
import styles from './NavDrawer.module.css'

export type NavDrawerProps = {
  open: boolean
  items: Array<Pick<NavLinkProps, 'to' | 'label'>>
  onClose: () => void
}

export function NavDrawer({ open, items, onClose }: NavDrawerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!mounted) {
    return null
  }

  return createPortal(
    <div className={open ? `${styles.root} ${styles.open}` : styles.root} inert={!open}>
      <button className={styles.backdrop} type="button" aria-label="Close menu" onClick={onClose} />
      <nav id="site-menu" className={styles.panel} aria-label="Primary">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            label={item.label}
            block
            onSelect={onClose}
          />
        ))}
      </nav>
    </div>,
    document.body,
  )
}
