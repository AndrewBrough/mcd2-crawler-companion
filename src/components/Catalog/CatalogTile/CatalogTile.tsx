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
  pixelBorder?: boolean
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
  pixelBorder = false,
}: CatalogTileProps) {
  const className = [styles.tile, selected ? styles.selected : '', pixelBorder ? styles.pixel : '']
    .filter(Boolean)
    .join(' ')
  const label = selectLabel ?? name
  const preview = (
    <span className={styles.previewSlot}>
      <span className={pixelBorder ? `${styles.preview} ${styles.notched}` : styles.preview}>
        {slug && catalogKind ? (
          <ThumbnailImage catalogKind={catalogKind} slug={slug} size="fill" />
        ) : (
          <span className={styles.emptyLabel}>{emptyLabel}</span>
        )}
      </span>
      {pixelBorder && selected ? <span className={styles.pixelOutline} aria-hidden="true" /> : null}
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
