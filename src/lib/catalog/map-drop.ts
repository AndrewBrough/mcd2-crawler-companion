import type { DropRateEntry, NamedRef } from '#/types/data/drop-rate'

export type NamedEmbed = {
  slug: string
  name: string
} | null

export type DropEmbed = {
  drop_rate: number | string
  target: NamedEmbed
}

export function mapNamedRef(row: NamedEmbed): NamedRef | null {
  if (!row) {
    return null
  }

  return { slug: row.slug, name: row.name }
}

export function mapDrop(row: DropEmbed): DropRateEntry | null {
  const target = mapNamedRef(row.target)

  if (!target) {
    return null
  }

  return {
    ...target,
    dropRate: Number(row.drop_rate),
  }
}

export function compactMap<T, U>(rows: Array<T> | null, mapRow: (row: T) => U | null): Array<U> {
  return (rows ?? []).flatMap((row) => {
    const mapped = mapRow(row)
    return mapped ? [mapped] : []
  })
}
