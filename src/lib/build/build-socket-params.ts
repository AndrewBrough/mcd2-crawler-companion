export const BUILD_SOCKET_PARAMS = {
  melee: 'm',
  ranged: 'r',
  helmet: 'h',
  chest: 'c',
  leggings: 'l',
  boots: 'b',
  'artifact-1': 'a1',
  'artifact-2': 'a2',
  'artifact-3': 'a3',
  'talisman-1': 't1',
  'talisman-2': 't2',
  'talisman-3': 't3',
} as const

export const BUILD_SOCKET_SEARCH_KEYS = Object.values(BUILD_SOCKET_PARAMS)

export type BuildSocketParam = (typeof BUILD_SOCKET_SEARCH_KEYS)[number]
