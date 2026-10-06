import { CatalogTile } from '#/components/Catalog'
import type { CatalogKind } from '#/types/catalog'
import { GearRollTooltip, type GearRollLevel } from '../GearRollTooltip'

export type GearRollTileProps = {
  name: string
  slug: string
  catalogKind: Extract<CatalogKind, 'effects' | 'enchantments'>
  description: string
  levels: Array<GearRollLevel>
  unique?: boolean
}

export function GearRollTile({
  name,
  slug,
  catalogKind,
  description,
  levels,
  unique = false,
}: GearRollTileProps) {
  return (
    <GearRollTooltip description={description} levels={levels}>
      <CatalogTile
        name={name}
        slug={slug}
        catalogKind={catalogKind}
        pixelBorder
        unique={unique}
        size="small"
      />
    </GearRollTooltip>
  )
}
