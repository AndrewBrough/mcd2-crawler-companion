import { CatalogList } from '#/components/CatalogList'
import { EmptyState } from '#/components/EmptyState'
import { PageHeader } from '#/components/PageHeader'
import { formatGearType } from '#/lib/catalog/format-gear-type'
import type { GearListItem } from '#/types/data/gear'
import styles from './GearPage.module.css'

export type GearPageProps = {
  gear: Array<GearListItem>
}

export function GearPage({ gear }: GearPageProps) {
  return (
    <div className={styles.page}>
      <PageHeader
        kicker="Loot"
        title="Gear"
        description="Find every location and enemy that can drop a piece of gear, plus the rate."
      />
      {gear.length ? (
        <CatalogList
          cards={gear.map((item) => ({
            title: item.name,
            description: item.description,
            catalogKind: 'gear',
            slug: item.slug,
            kicker: formatGearType(item.type),
            dropGroups: [
              { label: 'Location sources', drops: item.locationSources },
              { label: 'Enemy sources', drops: item.enemySources },
            ],
          }))}
        />
      ) : (
        <EmptyState
          title="No gear yet"
          body="Add rows in the gear table, then attach drop rates from locations and enemies."
        />
      )}
    </div>
  )
}
