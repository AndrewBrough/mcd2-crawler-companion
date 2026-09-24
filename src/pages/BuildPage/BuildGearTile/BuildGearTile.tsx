import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import styles from './BuildGearTile.module.css'

export type BuildGearTileProps = {
  name: string
  slug: string
  selected: boolean
  onSelect: () => void
}

export function BuildGearTile({ name, slug, selected, onSelect }: BuildGearTileProps) {
  return (
    <button
      className={`${styles.tile} ${selected ? styles.selected : ''}`}
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={name}
    >
      <span className={styles.preview}>
        <ThumbnailImage catalogKind="gear" slug={slug} size="fill" />
      </span>
      <span className={styles.name}>{name}</span>
    </button>
  )
}
