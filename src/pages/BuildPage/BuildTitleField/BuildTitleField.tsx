import type { SavedBuild } from '#/lib/build/build-storage'
import { BuildSavedMenu } from '../BuildSavedMenu/BuildSavedMenu'
import { BuildTitleSave } from '../BuildTitleSave'
import styles from './BuildTitleField.module.css'

export type BuildTitleFieldProps = {
  value: string
  onChange: (value: string) => void
  showSave?: boolean
  onSave?: () => void
  savedBuilds?: Array<SavedBuild>
}

export function BuildTitleField({
  value,
  onChange,
  showSave = false,
  onSave,
  savedBuilds = [],
}: BuildTitleFieldProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <input
          className={styles.field}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Build name"
          placeholder="Untitled build"
        />
        {showSave && onSave ? <BuildTitleSave onSave={onSave} /> : null}
        {savedBuilds.length > 0 ? <BuildSavedMenu builds={savedBuilds} /> : null}
      </div>
    </div>
  )
}
