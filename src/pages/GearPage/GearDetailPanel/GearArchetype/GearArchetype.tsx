import { CatalogGrid } from '#/components/Catalog'
import type { Gear } from '#/types/data/gear'
import styles from './GearArchetype.module.css'

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
        <section key={group.name} className={styles.section}>
          <h3 className="heading">
            Similar Items <span className={styles.archetype}>{group.name} archetype</span>
          </h3>
          <CatalogGrid
            items={group.items}
            catalogKind="gear"
            onItemSelect={(entry) => onSelect(entry.slug)}
          />
        </section>
      ))}
    </>
  )
}
