import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '#/pages/HomePage'
import type { HomeLinkCardProps } from '#/pages/HomePage/HomeLinkCard'

const homeLinks: Array<HomeLinkCardProps> = [
  {
    to: '/locations',
    kicker: 'Missions',
    title: 'Locations',
    body: 'See enemies, linked missions, and drop tables for each area.',
    accent: 'secondary',
  },
  {
    to: '/enemies',
    kicker: 'Mobs',
    title: 'Enemies',
    body: 'Find where a mob spawns and what gear or items it can drop.',
    accent: 'primary',
  },
  {
    to: '/gear',
    kicker: 'Loot',
    title: 'Gear',
    body: 'Look up every source and drop rate for weapons, armor, and artifacts.',
    accent: 'secondary',
  },
]

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <HomePage links={homeLinks} />
}
