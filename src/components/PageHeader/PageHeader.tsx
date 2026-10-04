import styles from './PageHeader.module.css'

export type PageHeaderProps = {
  kicker?: string
  title: string
  description?: string
}

export function PageHeader({ kicker, title, description }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.kicker}>{kicker}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  )
}
