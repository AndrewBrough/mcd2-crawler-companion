import { CatalogTile } from '#/components/Catalog'
import { MiniTile } from '#/components/ui/MiniTile'
import type { SocketIcon } from '#/lib/build/socket-icons'
import type { Gear } from '#/types/data/gear'
import styles from './BuildSocket.module.css'

export type BuildSocketProps = {
  label: string
  selected: boolean
  equipped: Gear | null
  enchantment?: SocketIcon | null
  effects?: Array<SocketIcon>
  showEnchantmentsAndEffects?: boolean
  onSelect: () => void
  onClear: () => void
}

export function BuildSocket({
  label,
  selected,
  equipped,
  enchantment = null,
  effects = [],
  showEnchantmentsAndEffects = true,
  onSelect,
  onClear,
}: BuildSocketProps) {
  const showIcons = Boolean(
    showEnchantmentsAndEffects && equipped && (enchantment || effects.length),
  )

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
      {showIcons ? (
        <div className={styles.icons}>
          {enchantment ? <MiniTile {...enchantment} /> : <span className={styles.enchantmentSlot} />}
          {effects.map((effect) => (
            <MiniTile key={effect.slug} {...effect} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
