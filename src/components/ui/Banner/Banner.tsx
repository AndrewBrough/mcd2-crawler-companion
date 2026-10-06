import styles from './Banner.module.css'

export type BannerColor = 'grey' | 'secondary' | 'primary' | 'purple' | 'dark'

export type BannerProps = {
  title: string
  color?: BannerColor
  bleed?: boolean
}

export function Banner({ title, color = 'grey', bleed = false }: BannerProps) {
  const className = [styles.banner, styles[color], bleed ? styles.bleed : ''].filter(Boolean).join(' ')

  return <div className={className}>{title}</div>
}
