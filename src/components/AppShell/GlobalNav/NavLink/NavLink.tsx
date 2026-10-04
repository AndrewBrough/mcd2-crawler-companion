import { Link, useRouterState } from '@tanstack/react-router'
import styles from './NavLink.module.css'

export type NavLinkProps = {
  to: '/' | '/locations' | '/enemies' | '/gear' | '/effects' | '/enchantments'
  label: string
  block?: boolean
  onSelect?: () => void
}

export function NavLink({ to, label, block = false, onSelect }: NavLinkProps) {
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
