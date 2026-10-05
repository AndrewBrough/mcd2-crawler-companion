import { useEffect, useRef, useState } from 'react'
import { effectLevelLabel, type EffectDescriptionLevel } from '#/components/ui/EffectDescription'
import type { Effect } from '#/types/data/effect'
import { EffectSocketContent } from './EffectSocketContent'
import { EffectSocketTooltip } from './EffectSocketTooltip'
import styles from './EffectSocket.module.css'

export type EffectSocketProps = {
  effect?: Effect | null
  options?: Array<Effect>
  onSelect?: (slug: string, replaceSlug?: string) => void
  onChoose?: (slug: string) => void
  unique?: boolean
}

export function EffectSocket({ effect, options = [], onSelect, onChoose, unique = false }: EffectSocketProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const level: EffectDescriptionLevel = unique ? 'unique' : 3
  const activeLabel = effectLevelLabel(level)

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
    onSelect?.(slug, effect && slug !== effect.slug ? effect.slug : undefined)
  }

  if (effect && onChoose) {
    return (
      <EffectSocketTooltip levels={effect.levels} activeLabel={activeLabel}>
        <button className={styles.socket} type="button" onClick={() => onChoose(effect.slug)}>
          <EffectSocketContent effect={effect} level={level} />
        </button>
      </EffectSocketTooltip>
    )
  }

  if (effect && !onSelect) {
    return (
      <EffectSocketTooltip levels={effect.levels} activeLabel={activeLabel}>
        <div className={unique ? `${styles.socket} ${styles.unique}` : styles.socket}>
          <EffectSocketContent effect={effect} level={level} />
        </div>
      </EffectSocketTooltip>
    )
  }

  return (
    <div className={styles.wrap} ref={rootRef}>
      {effect ? (
        <EffectSocketTooltip levels={effect.levels} activeLabel={activeLabel}>
          <button
            className={styles.socket}
            type="button"
            aria-expanded={open}
            aria-haspopup="listbox"
            onClick={() => setOpen((current) => !current)}
          >
            <EffectSocketContent effect={effect} level={level} />
          </button>
        </EffectSocketTooltip>
      ) : (
        <button
          className={styles.empty}
          type="button"
          aria-label="Add effect"
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
          {effect ? (
            <li>
              <button className={`${styles.empty} ${styles.remove}`} type="button" onClick={() => choose(effect.slug)}>
                Remove effect
              </button>
            </li>
          ) : null}
          {options.map((option) => (
            <li key={option.slug}>
              <EffectSocket effect={option} onChoose={choose} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
