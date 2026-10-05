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

export const PINNABLE_SOCKET_IDS = [
  'melee',
  'ranged',
  'helmet',
  'chest',
  'leggings',
  'boots',
  'artifact-1',
  'artifact-2',
  'artifact-3',
] as const

const EFFECT_PIN_SLOTS = [1, 2, 3] as const

export type PinnableSocketId = (typeof PINNABLE_SOCKET_IDS)[number]
export type BuildEffectPinParam =
  `${(typeof BUILD_SOCKET_PARAMS)[PinnableSocketId]}e${(typeof EFFECT_PIN_SLOTS)[number]}`
export type BuildEnchantmentPinParam = `${(typeof BUILD_SOCKET_PARAMS)[PinnableSocketId]}n`
export type BuildPinParam = BuildEffectPinParam | BuildEnchantmentPinParam

export function isPinnableSocketId(socketId: string): socketId is PinnableSocketId {
  return (PINNABLE_SOCKET_IDS as ReadonlyArray<string>).includes(socketId)
}

function effectPinParam(socketId: PinnableSocketId, slot: (typeof EFFECT_PIN_SLOTS)[number]): BuildEffectPinParam {
  return `${BUILD_SOCKET_PARAMS[socketId]}e${slot}`
}

export function enchantmentPinParam(socketId: string): BuildEnchantmentPinParam | null {
  if (!isPinnableSocketId(socketId)) {
    return null
  }

  return `${BUILD_SOCKET_PARAMS[socketId]}n`
}

export function socketPinParams(socketId: string): Array<BuildPinParam> {
  if (!isPinnableSocketId(socketId)) {
    return []
  }

  return [
    effectPinParam(socketId, 1),
    effectPinParam(socketId, 2),
    effectPinParam(socketId, 3),
    enchantmentPinParam(socketId) as BuildEnchantmentPinParam,
  ]
}

export const BUILD_PIN_SEARCH_KEYS: Array<BuildPinParam> = PINNABLE_SOCKET_IDS.flatMap((socketId) =>
  socketPinParams(socketId),
)

type PinSearch = Partial<Record<BuildPinParam, string | undefined>>

export function clearSocketPins(search: PinSearch, socketId: string): void {
  for (const key of socketPinParams(socketId)) {
    delete search[key]
  }
}

export function readEffectPins(search: PinSearch, socketId: string): Array<string> {
  if (!isPinnableSocketId(socketId)) {
    return []
  }

  return EFFECT_PIN_SLOTS.flatMap((slot) => {
    const slug = search[effectPinParam(socketId, slot)]
    return slug ? [slug] : []
  })
}

export function writeEffectPins(search: PinSearch, socketId: string, slugs: Array<string>): void {
  if (!isPinnableSocketId(socketId)) {
    return
  }

  EFFECT_PIN_SLOTS.forEach((slot, index) => {
    const key = effectPinParam(socketId, slot)
    const slug = slugs[index]
    if (slug) {
      search[key] = slug
    } else {
      delete search[key]
    }
  })
}
