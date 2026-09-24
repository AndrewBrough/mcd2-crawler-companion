import { EntityCard, type EntityCardProps } from '#/components/EntityCard'
import styles from './CatalogList.module.css'

export type CatalogListCard = EntityCardProps

export type CatalogListProps = {
  cards: Array<CatalogListCard>
}

export function CatalogList({ cards }: CatalogListProps) {
  return (
    <div className={styles.list}>
      {cards.map((card) => (
        <EntityCard key={card.slug} {...card} />
      ))}
    </div>
  )
}
