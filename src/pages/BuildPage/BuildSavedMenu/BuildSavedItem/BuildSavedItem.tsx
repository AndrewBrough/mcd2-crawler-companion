import { createElement } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import { savedBuildLabel, type SavedBuild } from '#/lib/build/build-storage'
import { Button } from '#/components/ui/button'
import styles from './BuildSavedItem.module.css'

export type BuildSavedItemProps = {
  build: SavedBuild
  onSelect: (url: string) => void
  onDelete: (key: string) => void
}

export function BuildSavedItem({ build, onSelect, onDelete }: BuildSavedItemProps) {
  const label = savedBuildLabel(build.key)

  return (
    <li className={build.current ? `${styles.row} ${styles.current}` : styles.row}>
      <button className={styles.item} type="button" role="menuitem" onClick={() => onSelect(build.url)}>
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
