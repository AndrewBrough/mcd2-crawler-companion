import { createElement } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import styles from './BuildTitleSave.module.css'

export type BuildTitleSaveProps = {
  onSave: () => void
}

export function BuildTitleSave({ onSave }: BuildTitleSaveProps) {
  return (
    <button className={styles.button} type="button" aria-label="Save build name" onClick={onSave}>
      {createElement('wa-icon', { name: 'floppy-disk' })}
    </button>
  )
}
