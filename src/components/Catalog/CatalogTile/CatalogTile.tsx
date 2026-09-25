import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import type { CatalogKind } from '#/types/catalog'
import styles from './CatalogTile.module.css'

export type CatalogTileProps = {
  name: string
  slug: string
  catalogKind: CatalogKind
  selected?: boolean
  onSelect?: () => void
}

export function CatalogTile({
  name,
  slug,
  catalogKind,
  selected = false,
  onSelect,
}: CatalogTileProps) {
  const className = `${styles.tile} ${selected ? styles.selected : ''}`
  const preview = (
    <>
      <span className={styles.preview}>
        <ThumbnailImage catalogKind={catalogKind} slug={slug} size="fill" />
      </span>
      <span className={styles.name}>{name}</span>
    </>
  )

  if (!onSelect) {
    return <div className={className}>{preview}</div>
  }

  return (
    <button
      className={className}
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={name}
    >
      {preview}
    </button>
  )
}
