const effectGearLabels: Record<string, string> = {
  armor: 'Armor',
  melee: 'Melee',
  bow: 'Bow',
  crossbow: 'Crossbow',
  artifact: 'Artifact',
  talisman: 'Talisman',
  quiver: 'Quiver',
  'unique-only': 'Unique only',
}

export function formatEffectGearSlug(slug: string): string {
  return effectGearLabels[slug] ?? slug
}
