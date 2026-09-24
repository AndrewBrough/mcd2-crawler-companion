import { CatalogList } from '#/components/CatalogList'
import { EmptyState } from '#/components/EmptyState'
import { PageHeader } from '#/components/PageHeader'
import type { EnemyListItem } from '#/types/data/enemy'
import styles from './EnemiesPage.module.css'

export type EnemiesPageProps = {
  enemies: Array<EnemyListItem>
}

export function EnemiesPage({ enemies }: EnemiesPageProps) {
  return (
    <div className={styles.page}>
      <PageHeader
        kicker="Mobs"
        title="Enemies"
        description="Track where each enemy appears and what they drop while you grind."
      />
      {enemies.length ? (
        <CatalogList
          cards={enemies.map((enemy) => ({
            title: enemy.name,
            description: enemy.description,
            catalogKind: 'enemies',
            slug: enemy.slug,
            relationGroups: [{ label: 'Locations', relations: enemy.locations }],
            dropGroups: [
              { label: 'Gear drops', drops: enemy.gearDrops },
              { label: 'Item drops', drops: enemy.itemDrops },
            ],
          }))}
        />
      ) : (
        <EmptyState
          title="No enemies yet"
          body="Add rows in the enemies table to connect mobs with locations and drop rates."
        />
      )}
    </div>
  )
}
