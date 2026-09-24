import { useState } from 'react'
import { filterGear } from '#/lib/catalog/filter-gear'
import type { Gear, GearType } from '#/types/data/gear'
import { BuildGearFilters } from '../BuildGearFilters'
import { BuildGearGrid } from '../BuildGearGrid'
import { BuildGearSearch } from '../BuildGearSearch'
import styles from './BuildDetailPanel.module.css'

export type BuildDetailPanelProps = {
  gear: Array<Gear>
  typeFilter: GearType | null
  onTypeFilterChange: (type: GearType | null) => void
  selectedSlug: string | null
  onItemSelect: (item: Gear) => void
}

export function BuildDetailPanel({
  gear,
  typeFilter,
  onTypeFilterChange,
  selectedSlug,
  onItemSelect,
}: BuildDetailPanelProps) {
  const [query, setQuery] = useState('')
  const items = filterGear(gear, { query, type: typeFilter })

  return (
    <aside className={styles.panel} aria-label="Gear picker">
      <BuildGearSearch
        value={query}
        onChange={setQuery}
        typeFilter={typeFilter}
        onTypeFilterChange={onTypeFilterChange}
      />
      <BuildGearFilters type={typeFilter} onRemoveType={() => onTypeFilterChange(null)} />
      <div className={styles.results}>
        {items.length ? (
          <BuildGearGrid
            items={items}
            selectedSlug={selectedSlug}
            onItemSelect={onItemSelect}
          />
        ) : (
          <p className={styles.empty}>
            {gear.length ? 'No gear matches that search.' : 'No gear in the catalog yet.'}
          </p>
        )}
      </div>
    </aside>
  )
}
