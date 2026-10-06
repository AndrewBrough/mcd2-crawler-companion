import { GearRollTile, type GearRollTileProps } from './GearRollTile'
import styles from './GearRollTiles.module.css'

export type GearRollTileItem = GearRollTileProps

export type GearRollTilesProps = {
  items: Array<GearRollTileItem>
}

export function GearRollTiles({ items }: GearRollTilesProps) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={`${item.catalogKind}-${item.slug}`} className={styles.cell}>
          <GearRollTile {...item} />
        </li>
      ))}
    </ul>
  )
}
