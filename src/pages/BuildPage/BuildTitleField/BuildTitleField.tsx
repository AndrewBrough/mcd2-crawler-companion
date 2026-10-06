import { useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.row}>
      <div
        className={styles.field}
        onFocus={() => setMenuOpen(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setMenuOpen(false)
          }
        }}
      >
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Build name"
          aria-expanded={onDeleteBuild ? menuOpen : undefined}
          aria-controls={menuOpen ? 'saved-builds' : undefined}
          aria-autocomplete="list"
          role="combobox"
          placeholder="Untitled build"
        />
        {onDeleteBuild && menuOpen ? (
          <BuildSavedMenu
            builds={savedBuilds}
            query={value}
            onDelete={onDeleteBuild}
            onClose={() => setMenuOpen(false)}
          />
        ) : null}
      </div>
      {showSave && onSave ? <BuildTitleSave onSave={onSave} /> : null}
    </div>
  )
}
