import { Link, useRouterState } from '@tanstack/react-router'
import styles from './NavLink.module.css'

export type NavLinkProps = {
  to: '/' | '/locations' | '/enemies' | '/gear' | '/effects' | '/enchantments'
  label: string
  block?: boolean
  priority?: boolean
  onSelect?: () => void
}

export function NavLink({ to, label, block = false, priority = false, onSelect }: NavLinkProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const isActive = pathname === to

  return (
    <Link
      to={to}
      className={[
        styles.link,
        block ? styles.block : '',
        priority ? styles.priority : '',
        isActive ? styles.active : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onSelect}
    >
      {label}
    </Link>
  )
}
