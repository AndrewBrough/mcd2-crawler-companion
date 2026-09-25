import type { ReactNode } from 'react'
import styles from './CatalogSearch.module.css'

export type CatalogSearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  children?: ReactNode
}

export function CatalogSearch({
  value,
  onChange,
  placeholder,
  label,
  children,
}: CatalogSearchProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.kicker}>Catalog</span>
      <div className={styles.controls}>
        <input
          className={styles.field}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label={label}
        />
        {children}
      </div>
    </div>
  )
}
