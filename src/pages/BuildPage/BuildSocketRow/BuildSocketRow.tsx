import { socketIcons } from '#/lib/build/socket-icons'
import type { BuildSearch } from '#/lib/build/build-search'
import type { BuildLoadout, BuildSocketDefinition } from '#/types/data/build'
import type { Effect } from '#/types/data/effect'
import { BuildSocket } from '../BuildSocket'
import styles from './BuildSocketRow.module.css'

export type BuildSocketRowProps = {
  label: string
  sockets: Array<BuildSocketDefinition>
  loadout: BuildLoadout
  effects: Array<Effect>
  search: BuildSearch
  activeSocketId: string | null
  onSocketSelect: (socket: BuildSocketDefinition) => void
  onSocketClear: (socketId: string) => void
}

export function BuildSocketRow({
  label,
  sockets,
  loadout,
  effects,
  search,
  activeSocketId,
  onSocketSelect,
  onSocketClear,
}: BuildSocketRowProps) {
  return (
    <section className={styles.row}>
      <h2 className="heading">{label}</h2>
      <div className={styles.sockets}>
        {sockets.map((socket) => {
          const icons = socketIcons(socket.id, loadout[socket.id] ?? null, effects, search)
          return (
            <BuildSocket
              key={socket.id}
              label={socket.label}
              selected={activeSocketId === socket.id}
              equipped={loadout[socket.id] ?? null}
              enchantment={icons.enchantment}
              effects={icons.effects}
              onSelect={() => onSocketSelect(socket)}
              onClear={() => onSocketClear(socket.id)}
            />
          )
        })}
      </div>
    </section>
  )
}
