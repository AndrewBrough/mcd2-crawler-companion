import type { Gear } from '#/types/data/gear'

function isUnique(item: Gear): boolean {
  return item.rarity.includes('unique')
}

function familyId(item: Gear): string {
  return item.setId ? `${item.type}:${item.setId}` : item.slug
}

function compareName(left: string, right: string): number {
  return left.localeCompare(right, undefined, { sensitivity: 'base' })
}

export function sortGear(
  gear: Array<Gear>,
  isFavourite: (slug: string) => boolean,
  catalog: Array<Gear> = gear,
): Array<Gear> {
  const baseName = new Map<string, string>()
  for (const item of catalog) {
    if (item.setId && !isUnique(item)) {
      baseName.set(familyId(item), item.name)
    }
  }

  const favouriteFamily = new Set<string>()
  for (const item of gear) {
    if (isFavourite(item.slug)) {
      favouriteFamily.add(familyId(item))
    }
  }

  const sortName = (item: Gear) => baseName.get(familyId(item)) ?? item.name

  return [...gear].sort((left, right) => {
    const favourite =
      Number(favouriteFamily.has(familyId(right))) - Number(favouriteFamily.has(familyId(left)))
    if (favourite !== 0) {
      return favourite
    }

    const byFamilyName = compareName(sortName(left), sortName(right))
    if (byFamilyName !== 0) {
      return byFamilyName
    }

    const byFamily = compareName(familyId(left), familyId(right))
    if (byFamily !== 0) {
      return byFamily
    }

    const unique = Number(isUnique(left)) - Number(isUnique(right))
    if (unique !== 0) {
      return unique
    }

    return compareName(left.name, right.name)
  })
}
