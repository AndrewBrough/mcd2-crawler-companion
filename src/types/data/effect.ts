export type EffectLevel = {
  label: string
  percent: number
}

export type EffectGearRef = {
  slug: string
  name: string
}

export type Effect = {
  slug: string
  name: string
  description: string
  gearSlugs: Array<string>
  levels: Array<EffectLevel>
  uniqueGear: Array<EffectGearRef>
}
