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
  { to: '/effects', label: 'Effects' },
  { to: '/enchantments', label: 'Enchantments' },
]

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <BrandLink kicker="Minecraft Dungeons 2" title="Crawler Companion" />
          <GlobalNav items={navItems} />
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          All data is sourced from the unofficial Minecraft Dungeons 2 wiki. All official content is owned by Microsoft and Minecraft. Web app is built by <a href="https://andrewbrough.ca/" target="_blank" rel="noopener noreferrer">Andrew Brough</a>.
        </div>
      </footer>
    </div>
  )
}
