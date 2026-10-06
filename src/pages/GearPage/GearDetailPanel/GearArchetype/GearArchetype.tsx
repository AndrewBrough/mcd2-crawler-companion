import type { Gear } from '#/types/data/gear'
import { GearArchetypeGroup } from './GearArchetypeGroup'

export type GearArchetypeProps = {
  item: Gear
  gear: Array<Gear>
  onSelect: (slug: string) => void
}

export function GearArchetype({ item, gear, onSelect }: GearArchetypeProps) {
  const excluded = new Set([item.slug, ...item.variants.map((variant) => variant.slug)])
  const groups = item.archetypeNames.flatMap((name) => {
    const items = gear
      .filter((entry) => !excluded.has(entry.slug) && entry.archetypeNames.includes(name))
      .sort((left, right) => left.name.localeCompare(right.name))

    return items.length ? [{ name, items }] : []
  })

  if (!groups.length) {
    return null
  }

  return (
    <>
      {groups.map((group) => (
        <GearArchetypeGroup
          key={group.name}
          name={group.name}
          items={group.items}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}
