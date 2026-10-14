import { uniqueEffectForGear } from '#/lib/catalog/filter-effects'
import type { Effect } from '#/types/data/effect'
import type { Gear } from '#/types/data/gear'
import type { BuildSearch } from './build-search'
import { enchantmentPinParam, readEffectPins } from './build-socket-params'

export type SocketIcon = {
  slug: string
  name: string
  catalogKind: 'effects' | 'enchantments'
  tone: 'enchantment' | 'effect' | 'unique'
}

export type SocketIcons = {
  enchantment: SocketIcon | null
  effects: Array<SocketIcon>
}

export function socketIcons(
  socketId: string,
  item: Gear | null,
  effects: Array<Effect>,
  search: BuildSearch,
): SocketIcons {
  if (!item) {
    return { enchantment: null, effects: [] }
  }

  const enchantmentKey = enchantmentPinParam(socketId)
  const enchantmentSlug = enchantmentKey ? search[enchantmentKey] : null
  const enchantment = item.enchantments.find((entry) => entry.slug === enchantmentSlug) ?? null
  const unique = uniqueEffectForGear(effects, item.slug)
  const pinned = readEffectPins(search, socketId).flatMap((slug) => {
    const effect = effects.find((entry) => entry.slug === slug && entry.slug !== unique?.slug)
    return effect ? [effect] : []
  })

  return {
    enchantment: enchantment
      ? {
          slug: enchantment.slug,
          name: enchantment.name,
          catalogKind: 'enchantments',
          tone: 'enchantment',
        }
      : null,
    effects: [
      ...(unique
        ? [{ slug: unique.slug, name: unique.name, catalogKind: 'effects' as const, tone: 'unique' as const }]
        : []),
      ...pinned.map((effect) => ({
        slug: effect.slug,
        name: effect.name,
        catalogKind: 'effects' as const,
        tone: 'effect' as const,
      })),
    ],
  }
}
