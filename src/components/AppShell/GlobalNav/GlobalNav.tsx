import { NavLink, type NavLinkProps } from './NavLink'
import styles from './GlobalNav.module.css'

export type NavItem = Pick<NavLinkProps, 'to' | 'label'>

export type GlobalNavProps = {
  items: Array<NavItem>
}

export function GlobalNav({ items }: GlobalNavProps) {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} label={item.label} />
      ))}
    </nav>
  )
}
