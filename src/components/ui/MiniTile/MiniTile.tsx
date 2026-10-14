import { useState, type SyntheticEvent } from 'react'
import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import type { CatalogKind } from '#/types/catalog'
import styles from './MiniTile.module.css'

export type MiniTileTone = 'enchantment' | 'effect' | 'unique'

export type MiniTileProps = {
  name: string
  slug: string
  catalogKind: Extract<CatalogKind, 'effects' | 'enchantments'>
  tone: MiniTileTone
}

export function MiniTile({ name, slug, catalogKind, tone }: MiniTileProps) {
  const [tooltip, setTooltip] = useState<{ top: number; left: number } | null>(null)

  function showTooltip(event: SyntheticEvent<HTMLSpanElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltip({ top: rect.top - 4, left: rect.left })
  }

  return (
    <span
      className={styles.wrap}
      tabIndex={0}
      aria-label={name}
      onMouseEnter={showTooltip}
      onMouseLeave={() => setTooltip(null)}
      onFocus={showTooltip}
      onBlur={() => setTooltip(null)}
    >
      <span className={`${styles.tile} ${styles[tone]}`}>
        <ThumbnailImage catalogKind={catalogKind} slug={slug} size="fill" />
      </span>
      {tooltip ? (
        <span className={styles.tooltip} role="tooltip" style={{ top: tooltip.top, left: tooltip.left }}>
          {name}
        </span>
      ) : null}
    </span>
  )
}
