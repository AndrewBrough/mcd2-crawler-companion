import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Favourite } from '#/components/Favourite'
import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import type { CatalogLinkPath } from '#/lib/catalog/catalog-link'
import type { CatalogKind } from '#/types/catalog'
import styles from './CatalogTile.module.css'

export type CatalogTileSize = 'normal' | 'small'

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
  unique?: boolean
  size?: CatalogTileSize
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
  unique = false,
  size = 'normal',
}: CatalogTileProps) {
  const [pointerOver, setPointerOver] = useState(false)
  const className = [
    styles.tile,
    size === 'small' ? styles.small : '',
    selected ? styles.selected : '',
    pixelBorder ? styles.pixel : '',
  ]
    .filter(Boolean)
    .join(' ')
  const label = selectLabel ?? name
  const preview = (
    <span className={styles.previewSlot}>
      <span className={pixelBorder ? `${styles.preview} ${styles.notched}` : styles.preview}>
        {slug && catalogKind ? (
          <ThumbnailImage catalogKind={catalogKind} slug={slug} size="fill" unique={unique} />
        ) : (
          <span className={styles.emptyLabel}>{emptyLabel}</span>
        )}
      </span>
      {pixelBorder && selected ? <span className={styles.pixelOutline} aria-hidden="true" /> : null}
    </span>
  )
  const caption = name ? <span className={styles.name}>{name}</span> : null

  return (
    <div
      className={className}
      onMouseEnter={() => setPointerOver(true)}
      onMouseLeave={() => setPointerOver(false)}
      onFocus={() => setPointerOver(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPointerOver(false)
      }}
    >
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
      {catalogKind === 'gear' && slug ? (
        <Favourite slug={slug} name={name} placement="tile" visible={pointerOver} />
      ) : null}
    </div>
  )
}
