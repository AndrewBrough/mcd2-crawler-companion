import type { Gear } from '#/types/data/gear'

export function sortGear(gear: Array<Gear>, isFavourite: (slug: string) => boolean): Array<Gear> {
  return [...gear].sort((left, right) => {
    const favourite = Number(isFavourite(right.slug)) - Number(isFavourite(left.slug))

    if (favourite !== 0) {
      return favourite
    }

    return left.name.localeCompare(right.name, undefined, { sensitivity: 'base' })
  })
}
