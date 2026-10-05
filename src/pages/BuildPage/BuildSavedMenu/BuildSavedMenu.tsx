import { useNavigate } from '@tanstack/react-router'
import { createElement, useEffect, useRef, useState } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import type { SavedBuild } from '#/lib/build/build-storage'
import { BuildSavedItem } from './BuildSavedItem'
import styles from './BuildSavedMenu.module.css'

export type BuildSavedMenuProps = {
  builds: Array<SavedBuild>
  onDelete: (key: string) => void
}

export function BuildSavedMenu({ builds, onDelete }: BuildSavedMenuProps) {
  const navigate = useNavigate()
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

  function selectBuild(url: string) {
    setOpen(false)
    const parsed = new URL(url, window.location.origin)
    const search: Record<string, string> = {}
    parsed.searchParams.forEach((value, key) => {
      search[key] = value
    })
    void navigate({ to: '/', search } as Parameters<typeof navigate>[0])
  }

  function startNewBuild() {
    setOpen(false)
    void navigate({ to: '/', search: {} } as Parameters<typeof navigate>[0])
  }

  return (
    <div className={styles.menu} ref={rootRef}>
      <button
        className={styles.button}
        type="button"
        aria-label="Saved builds"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
      >
        {createElement('wa-icon', { name: 'angle-down' })}
      </button>
      {open ? (
        <ul className={styles.list} role="menu">
          <li className={builds.length > 0 ? styles.newBuildRow : undefined}>
            <button className={styles.newBuild} type="button" role="menuitem" onClick={startNewBuild}>
              New build
            </button>
          </li>
          {builds.map((build) => (
            <BuildSavedItem
              key={build.key}
              build={build}
              onSelect={selectBuild}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : null}
    </div>
  )
}
