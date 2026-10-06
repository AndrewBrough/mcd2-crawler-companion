import { createElement, type ReactNode } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import { Input } from '#/components/ui/Input'
import styles from './CatalogSearchField.module.css'

export type CatalogSearchFieldProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  onClear?: () => void
  accessory?: ReactNode
}

export function CatalogSearchField({
  value,
  onChange,
  placeholder,
  label,
  onClear,
  accessory,
}: CatalogSearchFieldProps) {
  return (
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
      {accessory}
    </div>
  )
}
