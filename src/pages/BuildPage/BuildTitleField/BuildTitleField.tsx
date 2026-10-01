import { BuildTitleSave } from '../BuildTitleSave'
import styles from './BuildTitleField.module.css'

export type BuildTitleFieldProps = {
  value: string
  onChange: (value: string) => void
  showSave?: boolean
  onSave?: () => void
}

export function BuildTitleField({ value, onChange, showSave = false, onSave }: BuildTitleFieldProps) {
  return (
    <div className={styles.wrap}>
      <p className={styles.kicker}>Loadout</p>
      <div className={styles.row}>
        <input
          className={styles.field}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Build name"
          placeholder="Untitled build"
        />
        {showSave && onSave ? <BuildTitleSave onSave={onSave} /> : null}
      </div>
    </div>
  )
}
