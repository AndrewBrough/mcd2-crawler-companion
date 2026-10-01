import { BUILD_SOCKET_ROWS, type BuildLoadout } from '#/types/data/build'
import type { Gear } from '#/types/data/gear'

export function targetSocketId(
  loadout: BuildLoadout,
  activeSocketId: string | null,
  item: Gear,
): string | undefined {
  const matches = BUILD_SOCKET_ROWS.flatMap((row) => row.sockets).filter(
    (socket) => socket.kind === item.type,
  )
  const active = matches.find((socket) => socket.id === activeSocketId)
  if (active) {
    return active.id
  }

  return matches.find((socket) => !loadout[socket.id])?.id ?? matches[0]?.id
}
