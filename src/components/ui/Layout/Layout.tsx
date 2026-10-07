import type { ReactNode } from 'react'
import styles from './Layout.module.css'

export type LayoutColumns = 'sidebar' | 'split'

export type LayoutMobilePanel = 'primary' | 'secondary'

export type LayoutProps = {
  header?: ReactNode
  children: ReactNode
  columns: LayoutColumns
  mobilePanel?: LayoutMobilePanel
}

export function Layout({ header, children, columns, mobilePanel }: LayoutProps) {
  const gridClass = columns === 'sidebar' ? styles.sidebar : styles.split
  const panelClass = mobilePanel ? styles[mobilePanel] : ''
  const pageClass = [styles.page, mobilePanel ? styles.single : ''].filter(Boolean).join(' ')
  const grid = [styles.grid, gridClass, panelClass].filter(Boolean).join(' ')

  return (
    <div className={pageClass}>
      {/* {header} */}
      <div className={grid}>{children}</div>
    </div>
  )
}
