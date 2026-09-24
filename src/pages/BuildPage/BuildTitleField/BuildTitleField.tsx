import styles from './BuildTitleField.module.css'

export type BuildTitleFieldProps = {
  value: string
  onChange: (value: string) => void
}

export function BuildTitleField({ value, onChange }: BuildTitleFieldProps) {
  return (
    <div className={styles.wrap}>
      <p className={styles.kicker}>Loadout</p>
      <input
        className={styles.field}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Build name"
        placeholder="Untitled build"
      />
    </div>
  )
}
