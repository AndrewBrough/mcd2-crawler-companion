import { formatGearType } from '#/lib/catalog/format-gear-type'
import { GEAR_TYPES, type Gear, type GearType } from '#/types/data/gear'

export const GEAR_WITHOUT_SET = ''

function isUnique(item: Gear): boolean {
  return item.rarity.includes('unique')
}

function setLabels(gear: Array<Gear>): Map<string, string> {
  const labels = new Map<string, string>()

  for (const item of gear) {
    if (item.setId && !labels.has(item.setId)) {
      labels.set(item.setId, item.name)
    }
  }

  for (const item of gear) {
    if (item.setId && !isUnique(item)) {
      labels.set(item.setId, item.name)
    }
  }

  return labels
}

export function gearSetGroupOrder(listed: Array<Gear>, gear: Array<Gear>): Array<string> {
  const labels = setLabels(gear)
  const ids = [...new Set(listed.flatMap((item) => (item.setId ? [item.setId] : [])))]
  ids.sort((left, right) =>
    (labels.get(left) ?? left).localeCompare(labels.get(right) ?? right, undefined, {
      sensitivity: 'base',
    }),
  )

  return listed.some((item) => !item.setId) ? [...ids, GEAR_WITHOUT_SET] : ids
}

export function gearSetGroupLabel(gear: Array<Gear>, setId: string): string {
  return setLabels(gear).get(setId) ?? setId
}

export function gearCatalogGroups(groupSets: boolean, listed: Array<Gear>, gear: Array<Gear>) {
  if (!groupSets) {
    return {
      items: listed,
      groupBy: (item: Gear) => item.type,
      groupLabel: (group: string) => formatGearType(group as GearType),
      groupOrder: GEAR_TYPES,
      hideBanner: undefined,
    }
  }

  return {
    items: sortGearWithinSets(listed),
    groupBy: (item: Gear) => item.setId ?? GEAR_WITHOUT_SET,
    groupLabel: (group: string) => gearSetGroupLabel(gear, group),
    groupOrder: gearSetGroupOrder(listed, gear),
    hideBanner: (group: string) => group === GEAR_WITHOUT_SET,
  }
}

export function sortGearWithinSets(gear: Array<Gear>): Array<Gear> {
  return [...gear].sort((left, right) => {
    const unique = Number(isUnique(right)) - Number(isUnique(left))
    if (unique !== 0) {
      return unique
    }

    return left.name.localeCompare(right.name, undefined, { sensitivity: 'base' })
  })
}
