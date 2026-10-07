import { createElement } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import { Button } from '#/components/ui/button'
import styles from './PanelBack.module.css'

export type PanelBackProps = {
  onClick: () => void
}

export function PanelBack({ onClick }: PanelBackProps) {
  return (
    <div className={styles.back}>
      <Button type="button" variant="grey" iconPosition="start" onClick={onClick}>
        Back
        {createElement('wa-icon', { name: 'angle-left', canvas: 'auto' })}
      </Button>
    </div>
  )
}
