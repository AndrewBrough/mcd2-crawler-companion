import { GearCatalog } from '#/components/GearCatalog'
import type { Effect } from '#/types/data/effect'
import type { Gear, GearRarity, GearType } from '#/types/data/gear'
import { GearDetailPanel } from '#/pages/GearPage/GearDetailPanel'
import { BuildGearAction } from '../BuildGearAction/BuildGearAction'
import styles from './BuildGearStage.module.css'

export type BuildGearStageProps = {
  gear: Array<Gear>
  effects: Array<Effect>
  detailItem: Gear | null
  inBuild: boolean
  typeFilter: GearType | null
  onTypeFilterChange: (type: GearType | null) => void
  rarityFilter: GearRarity | null
  onRarityFilterChange: (rarity: GearRarity | null) => void
  selectedSlug: string | null
  onItemSelect: (item: Gear) => void
  query: string
  onQueryChange: (query: string) => void
  onAdd: () => void
  onRemove: () => void
  onBack: () => void
}

export function BuildGearStage({
  gear,
  effects,
  detailItem,
  inBuild,
  typeFilter,
  onTypeFilterChange,
  rarityFilter,
  onRarityFilterChange,
  selectedSlug,
  onItemSelect,
  query,
  onQueryChange,
  onAdd,
  onRemove,
  onBack,
}: BuildGearStageProps) {
  return (
    <div className={styles.stage}>
      <div className={styles.catalog} hidden={detailItem !== null}>
        <GearCatalog
          gear={gear}
          typeFilter={typeFilter}
          onTypeFilterChange={onTypeFilterChange}
          rarityFilter={rarityFilter}
          onRarityFilterChange={onRarityFilterChange}
          selectedSlug={selectedSlug}
          onItemSelect={onItemSelect}
          query={query}
          onQueryChange={onQueryChange}
        />
      </div>
      {detailItem ? (
        <GearDetailPanel
          item={detailItem}
          effects={effects}
          footer={
            <BuildGearAction inBuild={inBuild} onAdd={onAdd} onRemove={onRemove} onBack={onBack} />
          }
        />
      ) : null}
    </div>
  )
}
