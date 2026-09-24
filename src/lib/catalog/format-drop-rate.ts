export function formatDropRate(dropRate: number): string {
  return `${(dropRate * 100).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}%`
}
