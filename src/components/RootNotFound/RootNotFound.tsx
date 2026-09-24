import { Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import styles from './RootNotFound.module.css'

export type RootNotFoundProps = Record<string, never>

export function RootNotFound(_props: RootNotFoundProps) {
  return (
    <div className={styles.missing}>
      <p className={styles.body}>Page not found.</p>
      <Button asChild>
        <Link to="/">Back home</Link>
      </Button>
    </div>
  )
}
