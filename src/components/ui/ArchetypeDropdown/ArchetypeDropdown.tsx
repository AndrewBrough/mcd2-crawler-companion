import type { Archetype } from '#/types/data/archetype'
import styles from './ArchetypeDropdown.module.css'

export type ArchetypeDropdownProps = {
  archetypes: Array<Archetype>
  value: string | null
  onChange: (slug: string | null) => void
}

export function ArchetypeDropdown({ archetypes, value, onChange }: ArchetypeDropdownProps) {
  return (
    <label className={styles.wrap}>
      <span className={styles.label}>Archetype</span>
      <select
        className={styles.select}
        value={value ?? ''}
        aria-label="Filter by archetype"
        onChange={(event) => {
          const slug = event.target.value
          onChange(archetypes.some((archetype) => archetype.slug === slug) ? slug : null)
        }}
      >
        <option value="">All archetypes</option>
        {archetypes.map((archetype) => (
          <option key={archetype.slug} value={archetype.slug}>
            {archetype.name}
          </option>
        ))}
      </select>
    </label>
  )
}
