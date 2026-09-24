import type { DropRateEntry, NamedRef } from './drop-rate'

export type Enemy = {
  slug: string
  name: string
  description: string
}

export type EnemyListItem = Enemy & {
  locations: Array<NamedRef>
  gearDrops: Array<DropRateEntry>
  itemDrops: Array<DropRateEntry>
}
