import { useState } from 'react'
import { EnchantmentSocket } from '#/components/ui/EnchantmentSocket'
import type { GearEnchantment } from '#/types/data/enchantment'
import { GearSectionToggle } from '../GearSectionToggle'
import styles from './GearEnchantments.module.css'

export type GearEnchantmentsProps = {
  enchantments: Array<GearEnchantment>
  pinnedSlug?: string | null
  onPinEnchantment?: (slug: string) => void
  collapsible?: boolean
}

export function GearEnchantments({
  enchantments,
  pinnedSlug = null,
  onPinEnchantment,
  collapsible = true,
}: GearEnchantmentsProps) {
  const [expanded, setExpanded] = useState(false)
  const pinned = enchantments.find((enchantment) => enchantment.slug === pinnedSlug) ?? null
  const options = enchantments.filter((enchantment) => enchantment.slug !== pinned?.slug)

  return (
    <section className={styles.section}>
      <GearSectionToggle
        label="Enchantment"
        heading="Enchantment"
        headingClassName={styles.title}
        expanded={expanded}
        collapsible={collapsible}
        onToggle={() => setExpanded((open) => !open)}
      >
        {onPinEnchantment && enchantments.length ? (
          <div className={styles.sockets}>
            {pinned ? (
              <EnchantmentSocket
                enchantment={pinned}
                options={options}
                onSelect={onPinEnchantment}
              />
            ) : (
              <EnchantmentSocket options={options} onSelect={onPinEnchantment} />
            )}
          </div>
        ) : null}
        {!onPinEnchantment && enchantments.length ? (
          <div className={styles.sockets}>
            {enchantments.map((enchantment) => (
              <EnchantmentSocket key={enchantment.slug} enchantment={enchantment} />
            ))}
          </div>
        ) : null}
        {!enchantments.length ? <p>No enchantments</p> : null}
      </GearSectionToggle>
    </section>
  )
}
