import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import styles from './NavLink.module.css'

export type NavLinkProps = {
  to: '/' | '/build' | '/locations' | '/enemies' | '/gear'
  label: string
}

export function NavLink({ to, label }: NavLinkProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const isActive = pathname === to

  return (
    <Button asChild variant={isActive ? 'default' : 'secondary'} size="sm">
      <Link to={to} className={styles.link}>
        {label}
      </Link>
    </Button>
  )
}
