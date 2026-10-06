import { Button } from '#/components/ui/button'
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
      <Button type="button" variant="grey" onClick={onBack}>
        Back
      </Button>
      <Button type="button" onClick={inBuild ? onRemove : onAdd}>
        {inBuild ? 'REMOVE FROM BUILD' : 'ADD TO BUILD'}
      </Button>
    </div>
  )
}
