import { useState } from 'react'
import { Catalog } from '#/components/Catalog'
import { CatalogBrowsePage } from '#/components/CatalogBrowsePage'
import type { EnemyListItem } from '#/types/data/enemy'
import { EnemyDetailPanel } from './EnemyDetailPanel'

export type EnemiesPageProps = {
  enemies: Array<EnemyListItem>
}

export function EnemiesPage({ enemies }: EnemiesPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
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
          onItemSelect={(item) => setSelectedSlug(item.slug)}
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
