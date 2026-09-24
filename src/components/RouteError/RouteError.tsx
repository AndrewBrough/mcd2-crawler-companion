import styles from './RouteError.module.css'

export type RouteErrorProps = {
  title: string
  body: string
}

export function RouteError({ title, body }: RouteErrorProps) {
  return (
    <div className={styles.error} role="alert">
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.body}>{body}</p>
    </div>
  )
}
