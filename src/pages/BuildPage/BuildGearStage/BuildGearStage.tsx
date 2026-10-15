import { GearCatalog } from '#/components/GearCatalog'
import { Banner } from '#/components/ui/Banner'
import { PanelBack } from '#/components/ui/PanelBack'
import type { BuildSearch } from '#/lib/build/build-search'
import { useGearPins } from '#/lib/build/use-build-pins'
import type { BuildLoadout } from '#/types/data/build'
import type { Archetype } from '#/types/data/archetype'
import type { Effect } from '#/types/data/effect'
import type { Gear, GearRarityFilter, GearType } from '#/types/data/gear'
import { GearDetailPanel } from '#/pages/GearPage/GearDetailPanel'
import { BuildGearAction } from '../BuildGearAction/BuildGearAction'
import styles from './BuildGearStage.module.css'

export type BuildGearStageProps = {
  gear: Array<Gear>
  effects: Array<Effect>
  archetypes: Array<Archetype>
  search: BuildSearch
  loadout: BuildLoadout
  activeSocketId: string | null
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
  onQuickAdd: (item: Gear) => void
  onRemove: () => void
  onBack: () => void
  onCatalogBack: () => void
  showCatalog: boolean
}

export function BuildGearStage({
  gear,
  effects,
  archetypes,
  search,
  loadout,
  activeSocketId,
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
  onQuickAdd,
  onRemove,
  onBack,
  onCatalogBack,
  showCatalog,
}: BuildGearStageProps) {
  const gearPins = useGearPins(search, loadout, detailItem, effects, activeSocketId)

  return (
    <div className={styles.stage}>
      <div className={styles.catalog} hidden={!showCatalog}>
        <GearCatalog
          gear={gear}
          effects={effects}
          archetypes={archetypes}
          typeFilter={typeFilter}
          onTypeFilterChange={onTypeFilterChange}
          rarityFilter={rarityFilter}
          onRarityFilterChange={onRarityFilterChange}
          selectedSlug={selectedSlug}
          onItemSelect={onItemSelect}
          onItemAdd={onQuickAdd}
          query={query}
          onQueryChange={onQueryChange}
          onSearchClear={onSearchClear}
          leading={<PanelBack onClick={onCatalogBack} />}
        />
      </div>
      {detailItem && !showCatalog ? (
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
          header={
            <>
              {inBuild ? <Banner title="Equipped" color="dark" bleed /> : null}
              <BuildGearAction inBuild={inBuild} onAdd={onAdd} onRemove={onRemove} onBack={onBack} />
            </>
          }
        />
      ) : null}
    </div>
  )
}
