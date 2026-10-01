import { Link } from '@tanstack/react-router'
import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import type { CatalogLinkPath } from '#/lib/catalog/catalog-link'
import type { CatalogKind } from '#/types/catalog'
import styles from './CatalogTile.module.css'

export type CatalogTileProps = {
  name: string
  slug?: string | null
  catalogKind?: CatalogKind
  selected?: boolean
  onSelect?: () => void
  to?: CatalogLinkPath
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
  to,
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
      {to && slug ? (
        <Link to={to} search={{ slug }} className={styles.frame} aria-label={label}>
          {preview}
          {caption}
        </Link>
      ) : onSelect ? (
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
