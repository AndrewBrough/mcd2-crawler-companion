import type { SavedBuild } from '#/lib/build/build-storage'
import { Input } from '#/components/ui/Input'
import { BuildSavedMenu } from '../BuildSavedMenu/BuildSavedMenu'
import { BuildTitleSave } from '../BuildTitleSave'
import styles from './BuildTitleField.module.css'

export type BuildTitleFieldProps = {
  value: string
  onChange: (value: string) => void
  showSave?: boolean
  onSave?: () => void
  savedBuilds?: Array<SavedBuild>
  onDeleteBuild?: (key: string) => void
}

export function BuildTitleField({
  value,
  onChange,
  showSave = false,
  onSave,
  savedBuilds = [],
  onDeleteBuild,
}: BuildTitleFieldProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <Input
          grow
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Build name"
          placeholder="Untitled build"
        />
        {showSave && onSave ? <BuildTitleSave onSave={onSave} /> : null}
        {onDeleteBuild ? <BuildSavedMenu builds={savedBuilds} onDelete={onDeleteBuild} /> : null}
      </div>
    </div>
  )
}
