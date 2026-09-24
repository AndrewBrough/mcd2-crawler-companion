import type { BuildLoadout, BuildSocketDefinition, BuildSocketRowDefinition } from '#/types/data/build'
import { BuildSocketRow } from '../BuildSocketRow'
import { BuildTitleField } from '../BuildTitleField'
import styles from './BuildLoadoutPanel.module.css'

export type BuildLoadoutPanelProps = {
  title: string
  onTitleChange: (title: string) => void
  rows: Array<BuildSocketRowDefinition>
  loadout: BuildLoadout
  activeSocketId: string | null
  onSocketSelect: (socket: BuildSocketDefinition) => void
  onSocketClear: (socketId: string) => void
}

export function BuildLoadoutPanel({
  title,
  onTitleChange,
  rows,
  loadout,
  activeSocketId,
  onSocketSelect,
  onSocketClear,
}: BuildLoadoutPanelProps) {
  return (
    <section className={styles.panel} aria-label="Build loadout">
      <BuildTitleField value={title} onChange={onTitleChange} />
      <div className={styles.rows}>
        {rows.map((row) => (
          <BuildSocketRow
            key={row.id}
            label={row.label}
            sockets={row.sockets}
            loadout={loadout}
            activeSocketId={activeSocketId}
            onSocketSelect={onSocketSelect}
            onSocketClear={onSocketClear}
          />
        ))}
      </div>
    </section>
  )
}
