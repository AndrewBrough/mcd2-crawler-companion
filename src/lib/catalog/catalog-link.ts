import type { CatalogKind } from '#/types/catalog'

export type CatalogLinkPath = '/gear' | '/effects' | '/enchantments'

const catalogLinks = {
  gear: '/gear',
  effects: '/effects',
  enchantments: '/enchantments',
} satisfies Partial<Record<CatalogKind, CatalogLinkPath>>

export function catalogLink(kind: CatalogKind): CatalogLinkPath | null {
  return catalogLinks[kind as keyof typeof catalogLinks] ?? null
}
