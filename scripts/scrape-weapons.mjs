import { appendWikiGear } from './wiki-gear-csv.mjs'

// Weapon names and infobox descriptions are adapted from the Minecraft Wiki
// (CC BY-NC-SA 3.0): https://minecraft.wiki/w/Dungeons_II:Weapon
await appendWikiGear({
  pageTitle: 'Dungeons II:Weapon',
  pageUrl: 'https://minecraft.wiki/w/Dungeons_II:Weapon',
  csvFile: 'weapons.csv',
  label: 'weapons',
  weaponSets: true,
  sections: [
    { heading: 'List of melee weapons', type: 'melee_weapon', pool: 'melee' },
    { heading: 'List of bows', type: 'ranged_weapon', pool: 'bow' },
    { heading: 'List of crossbows', type: 'ranged_weapon', pool: 'crossbow' },
  ],
})
