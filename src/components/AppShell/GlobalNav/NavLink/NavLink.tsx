import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import styles from './NavLink.module.css'

export type NavLinkProps = {
  to: '/' | '/build' | '/locations' | '/enemies' | '/gear' | '/effects' | '/enchantments'
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
    <Button
      asChild
      variant={isActive ? 'default' : 'secondary'}
      size="sm"
      className={block ? styles.block : undefined}
    >
      <Link to={to} className={styles.link} onClick={onSelect}>
        {label}
      </Link>
    </Button>
  )
}
