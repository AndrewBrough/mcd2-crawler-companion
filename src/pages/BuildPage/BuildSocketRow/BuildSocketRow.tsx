import type { BuildLoadout, BuildSocketDefinition } from '#/types/data/build'
import { BuildSocket } from '../BuildSocket'
import styles from './BuildSocketRow.module.css'

export type BuildSocketRowProps = {
  label: string
  sockets: Array<BuildSocketDefinition>
  loadout: BuildLoadout
  activeSocketId: string | null
  onSocketSelect: (socket: BuildSocketDefinition) => void
  onSocketClear: (socketId: string) => void
}

export function BuildSocketRow({
  label,
  sockets,
  loadout,
  activeSocketId,
  onSocketSelect,
  onSocketClear,
}: BuildSocketRowProps) {
  return (
    <section className={styles.row}>
      <h2 className={styles.label}>{label}</h2>
      <div className={styles.sockets}>
        {sockets.map((socket) => (
          <BuildSocket
            key={socket.id}
            kind={socket.kind}
            label={socket.label}
            selected={activeSocketId === socket.id}
            equipped={loadout[socket.id] ?? null}
            onSelect={() => onSocketSelect(socket)}
            onClear={() => onSocketClear(socket.id)}
          />
        ))}
      </div>
    </section>
  )
}
