import { CatalogTile } from '#/components/Catalog'
import type { Gear } from '#/types/data/gear'
import styles from './BuildSocket.module.css'

export type BuildSocketProps = {
  label: string
  selected: boolean
  equipped: Gear | null
  onSelect: () => void
  onClear: () => void
}

export function BuildSocket({ label, selected, equipped, onSelect, onClear }: BuildSocketProps) {
  return (
    <div className={styles.socket}>
      <CatalogTile
        name={equipped?.name ?? ''}
        slug={equipped?.slug}
        catalogKind="gear"
        selected={selected}
        onSelect={onSelect}
        emptyLabel={label}
        onClear={equipped ? onClear : undefined}
        clearLabel={equipped ? `Remove ${equipped.name} from ${label}` : undefined}
        selectLabel={equipped ? `${label}, ${equipped.name}` : `Filter catalog by ${label}`}
        pixelBorder
        unique={equipped?.rarity.includes('unique')}
      />
    </div>
  )
}
