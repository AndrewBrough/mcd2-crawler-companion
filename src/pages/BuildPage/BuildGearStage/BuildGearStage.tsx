import { GearCatalog } from '#/components/GearCatalog'
import type { BuildSearch } from '#/lib/build/build-search'
import { useGearPins } from '#/lib/build/use-build-pins'
import type { BuildLoadout } from '#/types/data/build'
import type { Effect } from '#/types/data/effect'
import type { Gear, GearRarityFilter, GearType } from '#/types/data/gear'
import { GearDetailPanel } from '#/pages/GearPage/GearDetailPanel'
import { BuildGearAction } from '../BuildGearAction/BuildGearAction'
import styles from './BuildGearStage.module.css'

export type BuildGearStageProps = {
  gear: Array<Gear>
  effects: Array<Effect>
  search: BuildSearch
  loadout: BuildLoadout
  detailItem: Gear | null
  inBuild: boolean
  typeFilter: GearType | null
  onTypeFilterChange: (type: GearType | null) => void
  rarityFilter: GearRarityFilter | null
  onRarityFilterChange: (rarity: GearRarityFilter | null) => void
  selectedSlug: string | null
  onItemSelect: (item: Gear) => void
  query: string
  onQueryChange: (query: string) => void
  onSearchClear?: () => void
  onAdd: () => void
  onRemove: () => void
  onBack: () => void
}

export function BuildGearStage({
  gear,
  effects,
  search,
  loadout,
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
  onSearchClear,
  onAdd,
  onRemove,
  onBack,
}: BuildGearStageProps) {
  const gearPins = useGearPins(search, loadout, detailItem, effects)

  return (
    <div className={styles.stage}>
      <div className={styles.catalog} hidden={detailItem !== null}>
        <GearCatalog
          gear={gear}
          effects={effects}
          typeFilter={typeFilter}
          onTypeFilterChange={onTypeFilterChange}
          rarityFilter={rarityFilter}
          onRarityFilterChange={onRarityFilterChange}
          selectedSlug={selectedSlug}
          onItemSelect={onItemSelect}
          query={query}
          onQueryChange={onQueryChange}
          onSearchClear={onSearchClear}
        />
      </div>
      {detailItem ? (
        <GearDetailPanel
          item={detailItem}
          gear={gear}
          effects={effects}
          pinnedEffectSlugs={gearPins.pinnedEffectSlugs}
          onPinEffect={gearPins.onPinEffect}
          pinnedEnchantmentSlug={gearPins.pinnedEnchantmentSlug}
          onPinEnchantment={gearPins.onPinEnchantment}
          collapsibleRolls={false}
          onVariantSelect={(slug) => {
            const variant = gear.find((entry) => entry.slug === slug)
            if (variant) {
              onItemSelect(variant)
            }
          }}
          footer={
            <BuildGearAction inBuild={inBuild} onAdd={onAdd} onRemove={onRemove} onBack={onBack} />
          }
        />
      ) : null}
    </div>
  )
}
