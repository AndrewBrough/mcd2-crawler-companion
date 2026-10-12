import { useState, type KeyboardEvent } from 'react'
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

  function saveOnEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing || !showSave || !onSave) return
    event.preventDefault()
    onSave()
  }

  function moveOption(event: KeyboardEvent<HTMLDivElement>) {
    if (!menuOpen || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return
    const options = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-build-option]')]
    if (options.length === 0) return

    event.preventDefault()
    const current = options.indexOf(event.target as HTMLButtonElement)
    if (event.key === 'ArrowDown') {
      const next = current < 0 ? options[0] : options[Math.min(current + 1, options.length - 1)]
      next.focus()
      return
    }

    if (current <= 0) {
      event.currentTarget.querySelector('input')?.focus()
      return
    }

    options[current - 1].focus()
  }

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
        onKeyDown={moveOption}
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
          onKeyDown={saveOnEnter}
        />
        {onDeleteBuild && menuOpen ? (
          <BuildSavedMenu
            builds={savedBuilds}
            query={value}
            onDelete={onDeleteBuild}
          />
        ) : null}
      </div>
      {onSave ? <BuildTitleSave onSave={onSave} disabled={!showSave} /> : null}
    </div>
  )
}
