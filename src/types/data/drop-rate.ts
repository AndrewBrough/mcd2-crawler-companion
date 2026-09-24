export type NamedRef = {
  slug: string
  name: string
}

export type DropRateEntry = NamedRef & {
  dropRate: number
}
