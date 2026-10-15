import { useState } from 'react'
import { Catalog } from '#/components/Catalog'
import { CatalogSearchField } from '#/components/Catalog/CatalogSearch/CatalogSearchField'
import { CatalogBrowsePage } from '#/components/CatalogBrowsePage'
import { GearCatalogSearchSpacer, GearCatalogSearchToggle } from '#/components/GearCatalog/GearCatalogSearchToggle'
import { PanelBack } from '#/components/ui/PanelBack'
import { GearCatalogFilters } from '#/components/GearCatalog/GearCatalogFilters'
import { GearCatalogTypeSelect } from '#/components/GearCatalog/GearCatalogTypeSelect'
import { formatGearType } from '#/lib/catalog/format-gear-type'
import { useCatalogSlug } from '#/lib/catalog/use-catalog-slug'
import {
  ENCHANTMENT_GEAR_TYPES,
  type Enchantment,
  type EnchantmentGearType,
} from '#/types/data/enchantment'
import { EnchantmentDetailPanel } from './EnchantmentDetailPanel'

export type EnchantmentsPageProps = {
  enchantments: Array<Enchantment>
  initialSlug?: string | null
}

export function EnchantmentsPage({ enchantments, initialSlug = null }: EnchantmentsPageProps) {
  const [typeFilter, setTypeFilter] = useState<EnchantmentGearType | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [descriptionQuery, setDescriptionQuery] = useState('')
  const { selectedSlug, selectSlug, clearSlug, query, setQuery } = useCatalogSlug(initialSlug)
  const needle = descriptionQuery.trim().toLowerCase()
  const items = enchantments.filter(
    (item) =>
      (!typeFilter || item.gearTypes.includes(typeFilter)) &&
      (!needle || item.description.toLowerCase().includes(needle)),
  )
  const selected =
    enchantments.find((item) => item.slug === selectedSlug) ?? null

  return (
    <CatalogBrowsePage
      title="Enchantments"
      description="Browse the catalog and inspect an enchantment."
      detailOpen={selected !== null}
      catalog={
        <Catalog
          items={items}
          catalogKind="enchantments"
          selectedSlug={selectedSlug}
          onItemSelect={(item) => selectSlug(item.slug)}
          ariaLabel="Enchantment catalog"
          searchPlaceholder="Search enchantments name"
          searchLabel="Search enchantments name"
          emptyFiltered="No enchantments match that search."
          emptyCatalog="No enchantments in the catalog yet."
          extraSearchText={(item) => [
            ...item.gearTypes.map((type) => formatGearType(type)),
            ...item.tiers.map((tier) => tier.text),
          ]}
          searchAccessory={
            <GearCatalogSearchToggle
              open={filtersOpen}
              label="Description search"
              onToggle={() => setFiltersOpen((open) => !open)}
            />
          }
          searchDetails={
            filtersOpen ? (
              <CatalogSearchField
                value={descriptionQuery}
                onChange={setDescriptionQuery}
                placeholder="Search description"
                label="Search description"
                accessory={<GearCatalogSearchSpacer />}
              />
            ) : null
          }
          query={query}
          onQueryChange={setQuery}
          toolbar={
            <GearCatalogTypeSelect
              value={typeFilter}
              types={ENCHANTMENT_GEAR_TYPES}
              onChange={setTypeFilter}
            />
          }
          filters={
            <GearCatalogFilters
              type={typeFilter}
              onRemoveType={() => setTypeFilter(null)}
            />
          }
        />
      }
      detail={<EnchantmentDetailPanel item={selected} header={<PanelBack onClick={clearSlug} />} />}
    />
  )
}
