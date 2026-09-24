import type { DropRateEntry, NamedRef } from './drop-rate'

export type Location = {
  slug: string
  name: string
  description: string
}

export type LocationListItem = Location & {
  enemies: Array<NamedRef>
  relatedLocations: Array<NamedRef>
  gearDrops: Array<DropRateEntry>
  itemDrops: Array<DropRateEntry>
}
