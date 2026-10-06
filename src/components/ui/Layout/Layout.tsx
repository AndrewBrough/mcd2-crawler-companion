import type { ReactNode } from 'react'
import styles from './Layout.module.css'

export type LayoutColumns = 'sidebar' | 'split'

export type LayoutProps = {
  header?: ReactNode
  children: ReactNode
  columns: LayoutColumns
}

export function Layout({ header, children, columns }: LayoutProps) {
  const gridClass = columns === 'sidebar' ? styles.sidebar : styles.split

  return (
    <div className={styles.page}>
      {/* {header} */}
      <div className={`${styles.grid} ${gridClass}`}>{children}</div>
    </div>
  )
}
