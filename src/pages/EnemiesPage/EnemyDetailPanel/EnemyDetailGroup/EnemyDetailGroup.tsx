import styles from './EnemyDetailGroup.module.css'

export type EnemyDetailGroupProps = {
  label: string
  entries: Array<string>
}

export function EnemyDetailGroup({ label, entries }: EnemyDetailGroupProps) {
  return (
    <section className={styles.group}>
      <h3 className="heading">{label}</h3>
      {entries.length ? (
        <ul className={styles.list}>
          {entries.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      ) : (
        <p>None listed</p>
      )}
    </section>
  )
}
