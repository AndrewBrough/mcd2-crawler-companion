import { useEffect, useRef, useState } from 'react'
import styles from './EffectSocket.module.css'

export type EffectSocketEffect = {
  slug: string
  name: string
  description: string
}

export type EffectSocketProps = {
  effect?: EffectSocketEffect | null
  options?: Array<EffectSocketEffect>
  onSelect?: (slug: string) => void
  onChoose?: (slug: string) => void
}

export function EffectSocket({ effect, options = [], onSelect, onChoose }: EffectSocketProps) {
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

  if (effect && onChoose) {
    return (
      <button className={styles.socket} type="button" onClick={() => onChoose(effect.slug)}>
        <span className={styles.title}>{effect.name}</span>
        <span className={styles.description}>{effect.description || 'No description yet.'}</span>
      </button>
    )
  }

  if (effect && !onSelect) {
    return (
      <div className={styles.socket}>
        <span className={styles.title}>{effect.name}</span>
        <span className={styles.description}>{effect.description || 'No description yet.'}</span>
      </div>
    )
  }

  return (
    <div className={styles.wrap} ref={rootRef}>
      {effect ? (
        <button
          className={styles.socket}
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((current) => !current)}
        >
          <span className={styles.title}>{effect.name}</span>
          <span className={styles.description}>{effect.description || 'No description yet.'}</span>
        </button>
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
