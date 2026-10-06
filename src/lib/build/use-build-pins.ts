import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { effectsForGear, uniqueEffectForGear } from '#/lib/catalog/filter-effects'
import type { BuildLoadout } from '#/types/data/build'
import type { Effect } from '#/types/data/effect'
import type { Gear } from '#/types/data/gear'
import type { BuildSearch } from './build-search'
import {
  enchantmentPinParam,
  isPinnableSocketId,
  readEffectPins,
  writeEffectPins,
} from './build-socket-params'

export function effectPinCapForRarity(rarity: ReadonlyArray<string>): number {
  return rarity.includes('unique') ? 2 : 3
}

type NavigateSearch = (previous: BuildSearch) => BuildSearch

function pinnableSocketForSlug(loadout: BuildLoadout, slug: string): string | null {
  const match = Object.entries(loadout).find(
    ([socketId, item]) => item.slug === slug && isPinnableSocketId(socketId),
  )
  return match?.[0] ?? null
}

export function useBuildPins(search: BuildSearch) {
  const navigate = useNavigate()

  function updateSearch(update: NavigateSearch) {
    void navigate({
      resetScroll: false,
      search: update,
    } as Parameters<typeof navigate>[0])
  }

  function effectPins(socketId: string): Array<string> {
    return readEffectPins(search, socketId)
  }

  function enchantmentPin(socketId: string): string | null {
    const key = enchantmentPinParam(socketId)
    if (!key) {
      return null
    }

    return search[key] ?? null
  }

  function toggleEffect(
    socketId: string,
    slug: string,
    allowed: ReadonlySet<string>,
    cap: number,
    replaceSlug?: string,
  ) {
    if (!isPinnableSocketId(socketId) || !allowed.has(slug)) {
      return
    }

    updateSearch((previous) => {
      const next = { ...previous }
      const current = readEffectPins(previous, socketId).filter((item) => allowed.has(item))
      const packed = replaceSlug
        ? current.map((item) => (item === replaceSlug ? slug : item))
        : current.includes(slug)
          ? current.filter((item) => item !== slug)
          : current.length >= cap
            ? current
            : [...current, slug]
      writeEffectPins(next, socketId, packed.slice(0, cap))
      return next
    })
  }

  function toggleEnchantment(socketId: string, slug: string, allowed: ReadonlySet<string>) {
    const key = enchantmentPinParam(socketId)
    if (!key || !allowed.has(slug)) {
      return
    }

    updateSearch((previous) => {
      const next = { ...previous }
      if (next[key] === slug) {
        delete next[key]
      } else {
        next[key] = slug
      }
      return next
    })
  }

  function replaceEffectPins(socketId: string, slugs: Array<string>) {
    updateSearch((previous) => {
      const next = { ...previous }
      writeEffectPins(next, socketId, slugs)
      return next
    })
  }

  return { effectPins, enchantmentPin, toggleEffect, toggleEnchantment, replaceEffectPins }
}

export type GearPinProps = {
  pinnedEffectSlugs?: Array<string>
  onPinEffect?: (slug: string, replaceSlug?: string) => void
  pinnedEnchantmentSlug?: string | null
  onPinEnchantment?: (slug: string) => void
}

export function useGearPins(
  search: BuildSearch,
  loadout: BuildLoadout,
  item: Gear | null,
  effects: Array<Effect>,
): GearPinProps {
  const pins = useBuildPins(search)
  const socketId = item ? pinnableSocketForSlug(loadout, item.slug) : null
  const uniqueSlug = item ? uniqueEffectForGear(effects, item.slug)?.slug : null
  const pinCap = item ? effectPinCapForRarity(item.rarity) : 3

  useEffect(() => {
    if (!socketId) {
      return
    }

    const current = readEffectPins(search, socketId)
    const next = current.filter((slug) => slug !== uniqueSlug).slice(0, pinCap)
    const unchanged =
      next.length === current.length && next.every((slug, index) => slug === current[index])

    if (unchanged) {
      return
    }

    pins.replaceEffectPins(socketId, next)
  }, [pinCap, search, socketId, uniqueSlug])

  if (!item || !socketId) {
    return {}
  }

  const allowedEffects = new Set(effectsForGear(effects, item).map((effect) => effect.slug))
  const allowedEnchantments = new Set(item.enchantments.map((enchantment) => enchantment.slug))
  const enchantmentSlug = pins.enchantmentPin(socketId)

  return {
    pinnedEffectSlugs: pins
      .effectPins(socketId)
      .filter((slug) => allowedEffects.has(slug))
      .slice(0, pinCap),
    onPinEffect: (slug, replaceSlug) =>
      pins.toggleEffect(socketId, slug, allowedEffects, pinCap, replaceSlug),
    pinnedEnchantmentSlug: enchantmentSlug && allowedEnchantments.has(enchantmentSlug) ? enchantmentSlug : null,
    onPinEnchantment: (slug) => pins.toggleEnchantment(socketId, slug, allowedEnchantments),
  }
}
