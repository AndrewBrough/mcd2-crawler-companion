import { CatalogDetailPanel } from '#/components/CatalogDetailPanel'
import type { Effect } from '#/types/data/effect'
import { EffectCategories } from './EffectCategories'
import { EffectLevels } from './EffectLevels'
import { EffectUniqueGear } from './EffectUniqueGear'

export type EffectDetailPanelProps = {
  item: Effect | null
}

export function EffectDetailPanel({ item }: EffectDetailPanelProps) {
  return (
    <CatalogDetailPanel
      ariaLabel="Effect details"
      emptyMessage="Select an effect to see its details."
      item={item}
    >
      {item ? (
        <>
          <EffectLevels levels={item.levels} />
          <EffectCategories gearSlugs={item.gearSlugs} />
          <EffectUniqueGear gear={item.uniqueGear} />
        </>
      ) : null}
    </CatalogDetailPanel>
  )
}
