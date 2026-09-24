import { ThumbnailImage } from '#/components/EntityCard/ThumbnailImage'
import type { Gear, GearType } from '#/types/data/gear'
import styles from './BuildSocket.module.css'

export type BuildSocketProps = {
  kind: GearType
  label: string
  selected: boolean
  equipped: Gear | null
  onSelect: () => void
  onClear: () => void
}

export function BuildSocket({
  kind,
  label,
  selected,
  equipped,
  onSelect,
  onClear,
}: BuildSocketProps) {
  const accent = kind === 'melee_weapon' || kind === 'ranged_weapon' ? styles.primary : styles.secondary
  const filled = equipped ? styles.filled : ''
  const selectedClass = selected ? styles.selected : ''

  return (
    <div className={`${styles.socket} ${accent} ${filled} ${selectedClass}`}>
      <div className={styles.slot}>
        <button
          className={styles.frameButton}
          type="button"
          onClick={onSelect}
          aria-pressed={selected}
          aria-label={equipped ? `${label}, ${equipped.name}` : `Filter catalog by ${label}`}
        >
          <span className={styles.frame}>
            {equipped ? (
              <ThumbnailImage catalogKind="gear" slug={equipped.slug} size="fill" />
            ) : (
              <span className={styles.innerLabel}>{label}</span>
            )}
          </span>
        </button>
        {equipped ? (
          <button
            className={styles.clear}
            type="button"
            onClick={onClear}
            aria-label={`Remove ${equipped.name} from ${label}`}
          >
            ×
          </button>
        ) : null}
      </div>
      {equipped ? <p className={styles.caption}>{equipped.name}</p> : null}
    </div>
  )
}
