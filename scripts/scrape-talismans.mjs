import { appendWikiGear } from './wiki-gear-csv.mjs'

// Talisman names and infobox descriptions are adapted from the Minecraft Wiki
// (CC BY-NC-SA 3.0): https://minecraft.wiki/w/Dungeons_II:Talisman
await appendWikiGear({
  pageTitle: 'Dungeons II:Talisman',
  pageUrl: 'https://minecraft.wiki/w/Dungeons_II:Talisman',
  csvFile: 'talismans.csv',
  label: 'talismans',
  sections: [{ heading: 'List of talismans', type: 'talisman' }],
})
