import { formatDropRate } from '#/lib/catalog/format-drop-rate'
import type { CatalogKind } from '#/types/catalog'
import { ThumbnailImage } from './ThumbnailImage'
import styles from './EntityCard.module.css'

export type EntityCardRelation = {
  name: string
}

export type EntityCardDrop = {
  name: string
  dropRate: number
}

export type EntityCardDropGroup = {
  label: string
  drops: Array<EntityCardDrop>
}

export type EntityCardRelationGroup = {
  label: string
  relations: Array<EntityCardRelation>
}

export type EntityCardProps = {
  title: string
  description: string
  catalogKind: CatalogKind
  slug: string
  kicker?: string
  relationGroups?: Array<EntityCardRelationGroup>
  dropGroups?: Array<EntityCardDropGroup>
}

export function EntityCard({
  title,
  description,
  catalogKind,
  slug,
  kicker,
  relationGroups = [],
  dropGroups = [],
}: EntityCardProps) {
  return (
    <article className={styles.card}>
      <ThumbnailImage catalogKind={catalogKind} slug={slug} />
      <div className={styles.body}>
        {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description || 'No description yet.'}</p>
        {relationGroups.map((group) =>
          group.relations.length ? (
            <section key={group.label}>
              <h3 className={styles.sectionTitle}>{group.label}</h3>
              <div className={styles.chips}>
                {group.relations.map((relation) => (
                  <span key={`${group.label}-${relation.name}`} className={styles.chip}>
                    {relation.name}
                  </span>
                ))}
              </div>
            </section>
          ) : null,
        )}
        {dropGroups.map((group) =>
          group.drops.length ? (
            <section key={group.label}>
              <h3 className={styles.sectionTitle}>{group.label}</h3>
              <dl className={styles.drops}>
                {group.drops.map((drop) => (
                  <div key={`${group.label}-${drop.name}`} className={styles.dropRow}>
                    <dt className={styles.dropName}>{drop.name}</dt>
                    <dd className={styles.dropRate}>{formatDropRate(drop.dropRate)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null,
        )}
      </div>
    </article>
  )
}
