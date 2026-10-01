import { useCallback, useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { NavDrawer } from './NavDrawer'
import { NavLink, type NavLinkProps } from './NavLink'
import { NavMenuButton } from './NavMenuButton'
import styles from './GlobalNav.module.css'

export type NavItem = Pick<NavLinkProps, 'to' | 'label'>

export type GlobalNavProps = {
  items: Array<NavItem>
}

export function GlobalNav({ items }: GlobalNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <nav className={styles.nav} aria-label="Primary">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} label={item.label} />
        ))}
      </nav>
      <NavMenuButton open={open} onToggle={() => setOpen((current) => !current)} />
      <NavDrawer open={open} items={items} onClose={close} />
    </>
  )
}
