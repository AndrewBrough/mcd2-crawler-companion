import { PageHeader } from '#/components/PageHeader'
import { HomeLinkCard, type HomeLinkCardProps } from './HomeLinkCard'
import styles from './HomePage.module.css'

export type HomePageProps = {
  links: Array<HomeLinkCardProps>
}

export function HomePage({ links }: HomePageProps) {
  return (
    <div className={styles.page}>
      <PageHeader
        kicker="Build companion"
        title="Find where to grind your next drop"
        description="Browse locations, enemies, and gear to see drop rates and where to hunt."
      />
      <div className={styles.grid}>
        {links.map((link) => (
          <HomeLinkCard key={link.to} {...link} />
        ))}
      </div>
    </div>
  )
}
