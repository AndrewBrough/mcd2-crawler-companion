import type { BuildSearch } from '#/lib/build/build-search'
import type { SavedBuild } from '#/lib/build/build-storage'
import type { BuildLoadout, BuildSocketDefinition, BuildSocketRowDefinition } from '#/types/data/build'
import type { Effect } from '#/types/data/effect'
import { BuildSocketRow } from '../BuildSocketRow'
import { BuildTitleField } from '../BuildTitleField'
import styles from './BuildLoadoutPanel.module.css'

export type BuildLoadoutPanelProps = {
  title: string
  onTitleChange: (title: string) => void
  showSave?: boolean
  onSave?: () => void
  savedBuilds?: Array<SavedBuild>
  onDeleteBuild?: (key: string) => void
  rows: Array<BuildSocketRowDefinition>
  loadout: BuildLoadout
  effects: Array<Effect>
  search: BuildSearch
  activeSocketId: string | null
  onSocketSelect: (socket: BuildSocketDefinition) => void
  onSocketClear: (socketId: string) => void
}

export function BuildLoadoutPanel({
  title,
  onTitleChange,
  showSave,
  onSave,
  savedBuilds,
  onDeleteBuild,
  rows,
  loadout,
  effects,
  search,
  activeSocketId,
  onSocketSelect,
  onSocketClear,
}: BuildLoadoutPanelProps) {
  return (
    <section className={styles.panel} aria-label="Build loadout">
      <BuildTitleField
        value={title}
        onChange={onTitleChange}
        showSave={showSave}
        onSave={onSave}
        savedBuilds={savedBuilds}
        onDeleteBuild={onDeleteBuild}
      />
      <div className={styles.rows}>
        {rows.map((row) => (
          <BuildSocketRow
            key={row.id}
            label={row.label}
            sockets={row.sockets}
            loadout={loadout}
            effects={effects}
            search={search}
            activeSocketId={activeSocketId}
            onSocketSelect={onSocketSelect}
            onSocketClear={onSocketClear}
          />
        ))}
      </div>
    </section>
  )
}
