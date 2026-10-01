import { Link } from '@tanstack/react-router'
import styles from './HomeLinkCard.module.css'

export type HomeLinkCardProps = {
  to: '/locations' | '/enemies' | '/gear' | '/effects' | '/enchantments'
  kicker: string
  title: string
  body: string
  accent: 'primary' | 'secondary'
}

export function HomeLinkCard({ to, kicker, title, body, accent }: HomeLinkCardProps) {
  const cardClass = accent === 'primary' ? `${styles.card} ${styles.primary}` : `${styles.card} ${styles.secondary}`

  return (
    <Link to={to} className={cardClass}>
      <span className={styles.kicker}>{kicker}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
    </Link>
  )
}
