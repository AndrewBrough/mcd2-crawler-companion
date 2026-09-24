import type { Gear } from '#/types/data/gear'
import { BuildGearTile } from '../BuildGearTile'
import styles from './BuildGearGrid.module.css'

export type BuildGearGridProps = {
  items: Array<Gear>
  selectedSlug: string | null
  onItemSelect: (item: Gear) => void
}

export function BuildGearGrid({ items, selectedSlug, onItemSelect }: BuildGearGridProps) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.slug} className={styles.cell}>
          <BuildGearTile
            name={item.name}
            slug={item.slug}
            selected={selectedSlug === item.slug}
            onSelect={() => onItemSelect(item)}
          />
        </li>
      ))}
    </ul>
  )
}
