import styles from './BuildGearAction.module.css'

export type BuildGearActionProps = {
  inBuild: boolean
  onAdd: () => void
  onRemove: () => void
  onBack: () => void
}

export function BuildGearAction({ inBuild, onAdd, onRemove, onBack }: BuildGearActionProps) {
  return (
    <div className={styles.row}>
      <button className={`${styles.button} ${styles.start}`} type="button" onClick={onBack}>
        Back
      </button>
      {inBuild ? <h3 className={`${styles.status} heading`}>In Build</h3> : <span className={styles.status} />}
      <button
        className={`${styles.button} ${styles.action} ${styles.end}`}
        type="button"
        onClick={inBuild ? onRemove : onAdd}
      >
        {inBuild ? 'Remove from build' : 'Add to build'}
      </button>
    </div>
  )
}
