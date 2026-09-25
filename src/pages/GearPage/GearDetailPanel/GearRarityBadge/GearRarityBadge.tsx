import type { GearRarity } from '#/types/data/gear'
import styles from './GearRarityBadge.module.css'

export type GearRarityBadgeProps = {
  rarity: GearRarity
}

const LABELS: Record<GearRarity, string> = {
  unique: 'Unique',
  regular: 'Regular',
}

export function GearRarityBadge({ rarity }: GearRarityBadgeProps) {
  return <span className={`${styles.badge} ${styles[rarity]}`}>{LABELS[rarity]}</span>
}
