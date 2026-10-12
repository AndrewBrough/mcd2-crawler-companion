import { createElement, useId } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import styles from './BuildTitleSave.module.css'

export type BuildTitleSaveProps = {
  onSave: () => void
  disabled?: boolean
}

export function BuildTitleSave({ onSave, disabled = false }: BuildTitleSaveProps) {
  const tooltipId = useId()

  return (
    <span className={styles.host}>
      <button
        className={styles.button}
        type="button"
        aria-label="Save build name"
        aria-describedby={tooltipId}
        disabled={disabled}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onSave}
      >
        {createElement('wa-icon', { name: 'floppy-disk' })}
      </button>
      <span className={styles.tooltip} id={tooltipId} role="tooltip">
        Change the name to save as a new build.
      </span>
    </span>
  )
}
