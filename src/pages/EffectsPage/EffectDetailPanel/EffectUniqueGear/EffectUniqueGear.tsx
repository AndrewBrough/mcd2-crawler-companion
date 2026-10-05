import { CatalogGrid } from '#/components/Catalog'
import type { EffectGearRef } from '#/types/data/effect'
import styles from './EffectUniqueGear.module.css'

export type EffectUniqueGearProps = {
  gear: Array<EffectGearRef>
}

export function EffectUniqueGear({ gear }: EffectUniqueGearProps) {
  return (
    <section className={styles.section}>
      <h3 className="heading">Unique gear</h3>
      {gear.length ? (
        <CatalogGrid items={gear} catalogKind="gear" linked />
      ) : (
        <p>No unique gear</p>
      )}
    </section>
  )
}
