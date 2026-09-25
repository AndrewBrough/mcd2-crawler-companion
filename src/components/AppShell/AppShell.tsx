import type { ReactNode } from 'react'
import { BrandLink } from './BrandLink'
import { GlobalNav, type NavItem } from './GlobalNav'
import styles from './AppShell.module.css'

export type AppShellProps = {
  children: ReactNode
}

const navItems: Array<NavItem> = [
  { to: '/', label: 'Home' },
  { to: '/build', label: 'Build' },
  { to: '/locations', label: 'Locations' },
  { to: '/enemies', label: 'Enemies' },
  { to: '/gear', label: 'Gear' },
  { to: '/enchantments', label: 'Enchantments' },
]

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <BrandLink kicker="Minecraft Dungeons" title="Crawler Companion" />
          <GlobalNav items={navItems} />
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          Hunt locations and enemies for gear drop rates.
        </div>
      </footer>
    </div>
  )
}
