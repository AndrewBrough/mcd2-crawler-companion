import { supabase } from '#/lib/supabase/client'
import type { CatalogKind } from '#/types/catalog'

export const DEFAULT_THUMBNAIL_URL = '/default_thumbnail.png'
export const CATALOG_THUMBNAIL_BUCKET = 'catalog-thumbnails'

export function catalogThumbnailPath(kind: CatalogKind, slug: string): string {
  return `${kind}/${slug}.png`
}

export function resolveThumbnailUrl(kind: CatalogKind, slug: string): string {
  const value = slug.trim()

  if (!value) {
    return DEFAULT_THUMBNAIL_URL
  }

  return supabase.storage
    .from(CATALOG_THUMBNAIL_BUCKET)
    .getPublicUrl(catalogThumbnailPath(kind, value)).data.publicUrl
}
