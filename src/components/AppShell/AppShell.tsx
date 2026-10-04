import type { ReactNode } from 'react'
import { BrandLink } from './BrandLink'
import { GlobalNav, type NavItem } from './GlobalNav'
import styles from './AppShell.module.css'

export type AppShellProps = {
  children: ReactNode
}

const navItems: Array<NavItem> = [
  { to: '/', label: 'Build' },
  { to: '/gear', label: 'Gear' },
  // { to: '/locations', label: 'Locations' },
  // { to: '/enemies', label: 'Enemies' },
  { to: '/effects', label: 'Effects' },
  { to: '/enchantments', label: 'Enchantments' },
]

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <BrandLink kicker="MCD2" title="Companion" />
          <GlobalNav items={navItems} />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  )
}
