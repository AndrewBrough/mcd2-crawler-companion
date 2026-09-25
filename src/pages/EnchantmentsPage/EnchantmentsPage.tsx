import { useState } from 'react'
import { Catalog } from '#/components/Catalog'
import { CatalogBrowsePage } from '#/components/CatalogBrowsePage'
import { GearCatalogFilters } from '#/components/GearCatalog/GearCatalogFilters'
import { GearCatalogTypeSelect } from '#/components/GearCatalog/GearCatalogTypeSelect'
import { formatGearType } from '#/lib/catalog/format-gear-type'
import {
  ENCHANTMENT_GEAR_TYPES,
  type Enchantment,
  type EnchantmentGearType,
} from '#/types/data/enchantment'
import { EnchantmentDetailPanel } from './EnchantmentDetailPanel'

export type EnchantmentsPageProps = {
  enchantments: Array<Enchantment>
}

export function EnchantmentsPage({ enchantments }: EnchantmentsPageProps) {
  const [typeFilter, setTypeFilter] = useState<EnchantmentGearType | null>(null)
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const items = typeFilter
    ? enchantments.filter((item) => item.gearType === typeFilter)
    : enchantments
  const selected =
    enchantments.find((item) => item.slug === selectedSlug) ?? null

  return (
    <CatalogBrowsePage
      kicker="Magic"
      title="Enchantments"
      description="Browse the catalog and inspect an enchantment."
      catalog={
        <Catalog
          items={items}
          catalogKind="enchantments"
          selectedSlug={selectedSlug}
          onItemSelect={(item) => setSelectedSlug(item.slug)}
          ariaLabel="Enchantment catalog"
          searchPlaceholder="Search enchantments"
          searchLabel="Search enchantments"
          emptyFiltered="No enchantments match that search."
          emptyCatalog="No enchantments in the catalog yet."
          extraSearchText={(item) => [
            item.description,
            formatGearType(item.gearType),
          ]}
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
      detail={<EnchantmentDetailPanel item={selected} />}
    />
  )
}
