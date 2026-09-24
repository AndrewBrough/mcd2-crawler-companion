import type { Gear, GearType } from './gear'

export type BuildLoadout = {
  [socketId: string]: Gear
}

export type BuildSocketDefinition = {
  id: string
  kind: GearType
  label: string
}

export type BuildSocketRowDefinition = {
  id: string
  label: string
  sockets: Array<BuildSocketDefinition>
}

export const BUILD_SOCKET_ROWS: Array<BuildSocketRowDefinition> = [
  {
    id: 'weapons',
    label: 'Weapons',
    sockets: [
      { id: 'melee', kind: 'melee_weapon', label: 'Melee' },
      { id: 'ranged', kind: 'ranged_weapon', label: 'Ranged' },
    ],
  },
  {
    id: 'armor',
    label: 'Armor',
    sockets: [
      { id: 'armor-1', kind: 'armor', label: 'Armor 1' },
      { id: 'armor-2', kind: 'armor', label: 'Armor 2' },
      { id: 'armor-3', kind: 'armor', label: 'Armor 3' },
      { id: 'armor-4', kind: 'armor', label: 'Armor 4' },
    ],
  },
  {
    id: 'artifacts',
    label: 'Artifacts',
    sockets: [
      { id: 'artifact-1', kind: 'artifact', label: 'Artifact 1' },
      { id: 'artifact-2', kind: 'artifact', label: 'Artifact 2' },
      { id: 'artifact-3', kind: 'artifact', label: 'Artifact 3' },
    ],
  },
  {
    id: 'talismans',
    label: 'Talismans',
    sockets: [
      { id: 'talisman-1', kind: 'talisman', label: 'Talisman 1' },
      { id: 'talisman-2', kind: 'talisman', label: 'Talisman 2' },
      { id: 'talisman-3', kind: 'talisman', label: 'Talisman 3' },
    ],
  },
]
