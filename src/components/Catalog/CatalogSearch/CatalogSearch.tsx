import type { ReactNode } from 'react'
import { CatalogSearchField } from './CatalogSearchField'
import styles from './CatalogSearch.module.css'

export type CatalogSearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  onClear?: () => void
  accessory?: ReactNode
  details?: ReactNode
  children?: ReactNode
}

export function CatalogSearch({
  value,
  onChange,
  placeholder,
  label,
  onClear,
  accessory,
  details,
  children,
}: CatalogSearchProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <CatalogSearchField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          label={label}
          onClear={onClear}
          accessory={accessory}
        />
        {details}
        {children}
      </div>
    </div>
  )
}
