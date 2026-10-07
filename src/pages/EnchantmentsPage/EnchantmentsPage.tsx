import { useState } from 'react'
import { Catalog } from '#/components/Catalog'
import { CatalogBrowsePage } from '#/components/CatalogBrowsePage'
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
  const { selectedSlug, selectSlug, clearSlug, query, setQuery } = useCatalogSlug(initialSlug)
  const items = typeFilter
    ? enchantments.filter((item) => item.gearTypes.includes(typeFilter))
    : enchantments
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
          searchPlaceholder="Search enchantments"
          searchLabel="Search enchantments"
          emptyFiltered="No enchantments match that search."
          emptyCatalog="No enchantments in the catalog yet."
          extraSearchText={(item) => [
            item.description,
            ...item.gearTypes.map((type) => formatGearType(type)),
            ...item.tiers.map((tier) => tier.text),
          ]}
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
