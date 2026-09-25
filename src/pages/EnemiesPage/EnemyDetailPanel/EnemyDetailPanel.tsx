import { CatalogDetailPanel } from '#/components/CatalogDetailPanel'
import { formatDropRate } from '#/lib/catalog/format-drop-rate'
import type { EnemyListItem } from '#/types/data/enemy'
import { EnemyDetailGroup } from './EnemyDetailGroup'

export type EnemyDetailPanelProps = {
  item: EnemyListItem | null
}

function names(entries: Array<{ name: string }>): Array<string> {
  return entries.map((entry) => entry.name)
}

function dropLabels(entries: Array<{ name: string; dropRate: number }>): Array<string> {
  return entries.map((entry) => `${entry.name} · ${formatDropRate(entry.dropRate)}`)
}

export function EnemyDetailPanel({ item }: EnemyDetailPanelProps) {
  return (
    <CatalogDetailPanel
      ariaLabel="Enemy details"
      emptyMessage="Select an enemy to see its details."
      item={item}
    >
      {item ? (
        <>
          <EnemyDetailGroup label="Locations" entries={names(item.locations)} />
          <EnemyDetailGroup label="Gear drops" entries={dropLabels(item.gearDrops)} />
          <EnemyDetailGroup label="Item drops" entries={dropLabels(item.itemDrops)} />
        </>
      ) : null}
    </CatalogDetailPanel>
  )
}
