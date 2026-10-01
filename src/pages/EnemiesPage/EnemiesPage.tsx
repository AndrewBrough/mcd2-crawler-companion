import { Catalog } from '#/components/Catalog'
import { CatalogBrowsePage } from '#/components/CatalogBrowsePage'
import { useCatalogSlug } from '#/lib/catalog/use-catalog-slug'
import type { EnemyListItem } from '#/types/data/enemy'
import { EnemyDetailPanel } from './EnemyDetailPanel'

export type EnemiesPageProps = {
  enemies: Array<EnemyListItem>
  initialSlug?: string | null
}

export function EnemiesPage({ enemies, initialSlug = null }: EnemiesPageProps) {
  const { selectedSlug, selectSlug, query, setQuery } = useCatalogSlug(initialSlug)
  const selected = enemies.find((item) => item.slug === selectedSlug) ?? null

  return (
    <CatalogBrowsePage
      kicker="Mobs"
      title="Enemies"
      description="Browse the catalog and inspect an enemy."
      catalog={
        <Catalog
          items={enemies}
          catalogKind="enemies"
          selectedSlug={selectedSlug}
          onItemSelect={(item) => selectSlug(item.slug)}
          query={query}
          onQueryChange={setQuery}
          ariaLabel="Enemy catalog"
          searchPlaceholder="Search enemies"
          searchLabel="Search enemies"
          emptyFiltered="No enemies match that search."
          emptyCatalog="No enemies in the catalog yet."
        />
      }
      detail={<EnemyDetailPanel item={selected} />}
    />
  )
}
