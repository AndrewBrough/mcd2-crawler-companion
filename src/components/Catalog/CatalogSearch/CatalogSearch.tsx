import { createElement, type ReactNode } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import { Input } from '#/components/ui/Input'
import styles from './CatalogSearch.module.css'

export type CatalogSearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  onClear?: () => void
  children?: ReactNode
}

export function CatalogSearch({
  value,
  onChange,
  placeholder,
  label,
  onClear,
  children,
}: CatalogSearchProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <div className={styles.field}>
          <Input
            type="search"
            grow
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            aria-label={label}
          />
          {value.length > 0 ? (
            <button
              className={styles.clear}
              type="button"
              aria-label="Clear search"
              onClick={() => {
                onChange('')
                onClear?.()
              }}
            >
              {createElement('wa-icon', {
                name: 'xmark',
                family: 'classic',
                variant: 'solid',
              })}
            </button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  )
}
