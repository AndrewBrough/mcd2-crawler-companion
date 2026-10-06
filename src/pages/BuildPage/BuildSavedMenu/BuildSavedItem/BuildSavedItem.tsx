import { createElement } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import { savedBuildLabel, type SavedBuild } from '#/lib/build/build-storage'
import { Button } from '#/components/ui/button'
import styles from './BuildSavedItem.module.css'

export type BuildSavedItemProps = {
  build: SavedBuild
  separated?: boolean
  onSelect: (url: string) => void
  onDelete: (key: string) => void
}

export function BuildSavedItem({ build, separated = false, onSelect, onDelete }: BuildSavedItemProps) {
  const label = savedBuildLabel(build.key)
  const rowClass = [styles.row, build.current ? styles.current : '', separated ? styles.separated : '']
    .filter(Boolean)
    .join(' ')

  return (
    <li className={rowClass}>
      <button
        className={styles.item}
        type="button"
        role="menuitem"
        data-build-option=""
        onClick={() => onSelect(build.url)}
      >
        {label}
      </button>
      <Button
        variant="danger"
        size="sm"
        type="button"
        aria-label={`Delete ${label}`}
        onClick={() => onDelete(build.key)}
      >
        {createElement('wa-icon', { name: 'trash', family: 'classic', variant: 'solid' })}
      </Button>
    </li>
  )
}
