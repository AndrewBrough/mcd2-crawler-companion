import { appendWikiGear } from './wiki-gear-csv.mjs'

// Armor names and infobox descriptions are adapted from the Minecraft Wiki
// (CC BY-NC-SA 3.0): https://minecraft.wiki/w/Dungeons_II:Armor
await appendWikiGear({
  pageTitle: 'Dungeons II:Armor',
  pageUrl: 'https://minecraft.wiki/w/Dungeons_II:Armor',
  csvFile: 'armor.csv',
  label: 'armor pieces',
  sections: [
    { heading: 'Helmets', type: 'armor_helmet' },
    { heading: 'Chestplates', type: 'armor_chest' },
    { heading: 'Leggings', type: 'armor_leggings' },
    { heading: 'Boots', type: 'armor_boots' },
  ],
})
