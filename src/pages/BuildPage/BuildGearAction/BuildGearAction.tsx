import { createElement } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
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
      <Button type="button" variant="grey" iconPosition="start" onClick={onBack}>
        Back
        {createElement('wa-icon', { name: 'angle-left' })}
      </Button>
      <Button type="button" iconPosition="start" onClick={inBuild ? onRemove : onAdd}>
        {inBuild ? 'REMOVE FROM BUILD' : 'ADD TO BUILD'}
        {createElement('wa-icon', { name: inBuild ? 'minus' : 'plus' })}
      </Button>
    </div>
  )
}
