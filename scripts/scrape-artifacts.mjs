import { appendWikiGear } from './wiki-gear-csv.mjs'

// Artifact names and lead sentences are adapted from the Minecraft Wiki
// (CC BY-NC-SA 3.0): https://minecraft.wiki/w/Dungeons_II:Artifact
await appendWikiGear({
  pageTitle: 'Dungeons II:Artifact',
  pageUrl: 'https://minecraft.wiki/w/Dungeons_II:Artifact',
  csvFile: 'artifacts.csv',
  label: 'artifacts',
  sections: [{ heading: 'List of artifacts', type: 'artifact' }],
})
