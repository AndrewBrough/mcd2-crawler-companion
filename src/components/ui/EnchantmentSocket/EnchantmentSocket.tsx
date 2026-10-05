import { useEffect, useRef, useState } from 'react'
import type { GearEnchantment } from '#/types/data/enchantment'
import { EnchantmentSocketContent } from './EnchantmentSocketContent'
import { EnchantmentSocketTooltip } from './EnchantmentSocketTooltip'
import styles from './EnchantmentSocket.module.css'

const ACTIVE_TIER = 'III'

export type EnchantmentSocketProps = {
  enchantment?: GearEnchantment | null
  options?: Array<GearEnchantment>
  onSelect?: (slug: string) => void
  onChoose?: (slug: string) => void
}

export function EnchantmentSocket({
  enchantment,
  options = [],
  onSelect,
  onChoose,
}: EnchantmentSocketProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    function closeOnOutside(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  function choose(slug: string) {
    setOpen(false)
    onSelect?.(slug)
  }

  if (enchantment && onChoose) {
    return (
      <EnchantmentSocketTooltip tiers={enchantment.tiers} activeLabel={ACTIVE_TIER}>
        <button className={styles.socket} type="button" onClick={() => onChoose(enchantment.slug)}>
          <EnchantmentSocketContent enchantment={enchantment} />
        </button>
      </EnchantmentSocketTooltip>
    )
  }

  return (
    <div className={styles.wrap} ref={rootRef}>
      {enchantment ? (
        <EnchantmentSocketTooltip tiers={enchantment.tiers} activeLabel={ACTIVE_TIER}>
          <button
            className={`${styles.socket} ${styles.selected}`}
            type="button"
            aria-expanded={open}
            aria-haspopup="listbox"
            onClick={() => setOpen((current) => !current)}
          >
            <EnchantmentSocketContent enchantment={enchantment} />
          </button>
        </EnchantmentSocketTooltip>
      ) : (
        <button
          className={styles.empty}
          type="button"
          aria-label="Add enchantment"
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={options.length === 0}
          onClick={() => setOpen((current) => !current)}
        >
          +
        </button>
      )}
      {open ? (
        <ul className={styles.menu} role="listbox">
          {enchantment ? (
            <li>
              <button
                className={`${styles.empty} ${styles.remove}`}
                type="button"
                onClick={() => choose(enchantment.slug)}
              >
                Remove enchantment
              </button>
            </li>
          ) : null}
          {options.map((option) => (
            <li key={option.slug}>
              <EnchantmentSocket enchantment={option} onChoose={choose} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
