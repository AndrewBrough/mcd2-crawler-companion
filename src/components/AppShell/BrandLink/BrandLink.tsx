import { Link } from '@tanstack/react-router'
import styles from './BrandLink.module.css'

export type BrandLinkProps = {
  kicker: string
  title: string
}

export function BrandLink({ kicker, title }: BrandLinkProps) {
  return (
    <Link to="/" className={styles.brand}>
      <span className={styles.kicker}>{kicker}</span>
      <span className={styles.title}>{title}</span>
    </Link>
  )
}
