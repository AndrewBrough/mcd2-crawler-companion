import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import styles from './GearDetailMedia.module.css'

export type GearDetailMediaProps = {
  slug: string
  baseDps: number | null
}

export function GearDetailMedia({ slug, baseDps }: GearDetailMediaProps) {
  return (
    <div className={styles.media}>
      <ThumbnailImage catalogKind="gear" slug={slug} size="detail" />
      {baseDps == null ? null : <h4 className={styles.dps}>DPS {formatBaseDps(baseDps)}</h4>}
    </div>
  )
}

function formatBaseDps(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value)
}
