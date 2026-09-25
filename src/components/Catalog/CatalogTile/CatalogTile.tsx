import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import type { CatalogKind } from '#/types/catalog'
import styles from './CatalogTile.module.css'

export type CatalogTileProps = {
  name: string
  slug?: string | null
  catalogKind?: CatalogKind
  selected?: boolean
  onSelect?: () => void
  emptyLabel?: string
  onClear?: () => void
  clearLabel?: string
  selectLabel?: string
}

export function CatalogTile({
  name,
  slug,
  catalogKind,
  selected = false,
  onSelect,
  emptyLabel,
  onClear,
  clearLabel,
  selectLabel,
}: CatalogTileProps) {
  const className = `${styles.tile} ${selected ? styles.selected : ''}`
  const label = selectLabel ?? name
  const preview = (
    <span className={styles.preview}>
      {slug && catalogKind ? (
        <ThumbnailImage catalogKind={catalogKind} slug={slug} size="fill" />
      ) : (
        <span className={styles.emptyLabel}>{emptyLabel}</span>
      )}
    </span>
  )
  const caption = name ? <span className={styles.name}>{name}</span> : null

  return (
    <div className={className}>
      {onSelect ? (
        <button
          className={styles.frame}
          type="button"
          onClick={onSelect}
          aria-pressed={selected}
          aria-label={label}
        >
          {preview}
          {caption}
        </button>
      ) : (
        <div className={styles.frame}>
          {preview}
          {caption}
        </div>
      )}
      {onClear ? (
        <button className={styles.clear} type="button" onClick={onClear} aria-label={clearLabel}>
          ×
        </button>
      ) : null}
    </div>
  )
}
