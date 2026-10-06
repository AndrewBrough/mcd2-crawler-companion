import { createElement, useId, type ReactNode } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import styles from './GearSectionToggle.module.css'

export type GearSectionToggleProps = {
  label: string
  heading: ReactNode
  headingClassName?: string
  headingTitle?: string
  expanded: boolean
  collapsible?: boolean
  onToggle: () => void
  children: ReactNode
}

export function GearSectionToggle({
  label,
  heading,
  headingClassName,
  headingTitle,
  expanded,
  collapsible = true,
  onToggle,
  children,
}: GearSectionToggleProps) {
  const panelId = useId()
  const headingClass = ['heading', styles.heading, headingClassName].filter(Boolean).join(' ')
  const open = collapsible ? expanded : true

  return (
    <>
      <div className={styles.header}>
        <h3 className={headingClass} title={headingTitle}>
          {heading}
        </h3>
        {collapsible ? (
          <button
            className={open ? `${styles.button} ${styles.expanded}` : styles.button}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? `Collapse ${label}` : `Expand ${label}`}
            onClick={onToggle}
          >
            {createElement('wa-icon', {
              name: 'angle-down',
              family: 'classic',
              variant: 'solid',
            })}
          </button>
        ) : null}
      </div>
      <div id={panelId} className={styles.panel} hidden={!open}>
        {children}
      </div>
    </>
  )
}
