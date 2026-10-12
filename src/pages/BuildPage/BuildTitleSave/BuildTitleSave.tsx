import { createElement } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import styles from './BuildTitleSave.module.css'

export type BuildTitleSaveProps = {
  onSave: () => void
  disabled?: boolean
}

export function BuildTitleSave({ onSave, disabled = false }: BuildTitleSaveProps) {
  return (
    <button
      className={styles.button}
      type="button"
      aria-label="Save build name"
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onSave}
    >
      {createElement('wa-icon', { name: 'floppy-disk' })}
    </button>
  )
}
