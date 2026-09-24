import styles from './CatalogPending.module.css'

export type CatalogPendingProps = Record<string, never>

export function CatalogPending(_props: CatalogPendingProps) {
  return <p className={styles.pending}>Loading catalog…</p>
}
