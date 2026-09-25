export const CATALOG_KINDS = [
  'locations',
  'enemies',
  'gear',
  'items',
  'enchantments',
] as const

export type CatalogKind = (typeof CATALOG_KINDS)[number]
