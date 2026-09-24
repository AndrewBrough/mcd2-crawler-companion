import { CatalogList } from '#/components/CatalogList'
import { EmptyState } from '#/components/EmptyState'
import { PageHeader } from '#/components/PageHeader'
import type { LocationListItem } from '#/types/data/location'
import styles from './LocationsPage.module.css'

export type LocationsPageProps = {
  locations: Array<LocationListItem>
}

export function LocationsPage({ locations }: LocationsPageProps) {
  return (
    <div className={styles.page}>
      <PageHeader
        kicker="Missions"
        title="Locations"
        description="See which enemies spawn here and which gear or items can drop."
      />
      {locations.length ? (
        <CatalogList
          cards={locations.map((location) => ({
            title: location.name,
            description: location.description,
            catalogKind: 'locations',
            slug: location.slug,
            relationGroups: [
              { label: 'Enemies', relations: location.enemies },
              { label: 'Related locations', relations: location.relatedLocations },
            ],
            dropGroups: [
              { label: 'Gear drops', drops: location.gearDrops },
              { label: 'Item drops', drops: location.itemDrops },
            ],
          }))}
        />
      ) : (
        <EmptyState
          title="No locations yet"
          body="Add rows in the locations table to start mapping missions and drop tables."
        />
      )}
    </div>
  )
}
