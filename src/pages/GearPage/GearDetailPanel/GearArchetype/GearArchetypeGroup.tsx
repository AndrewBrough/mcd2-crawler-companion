import { useState } from 'react'
import { CatalogGrid } from '#/components/Catalog'
import type { Gear } from '#/types/data/gear'
import { GearSectionToggle } from '../GearSectionToggle'
import styles from './GearArchetype.module.css'

export type GearArchetypeGroupProps = {
  name: string
  items: Array<Gear>
  onSelect: (slug: string) => void
}

export function GearArchetypeGroup({ name, items, onSelect }: GearArchetypeGroupProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className={styles.section}>
      <GearSectionToggle
        label={`Similar Items ${name}`}
        heading={
          <>
            Similar Items <span className={styles.archetype}>{name} archetype</span>
          </>
        }
        expanded={expanded}
        onToggle={() => setExpanded((open) => !open)}
      >
        <CatalogGrid
          items={items}
          catalogKind="gear"
          onItemSelect={(entry) => onSelect(entry.slug)}
        />
      </GearSectionToggle>
    </section>
  )
}
