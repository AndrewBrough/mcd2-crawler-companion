import { createElement } from 'react'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import { useFavourites } from '#/components/FavouritesProvider'
import styles from './Favourite.module.css'

export type FavouritePlacement = 'inline' | 'tile'

export type FavouriteProps = {
  slug: string
  name?: string
  placement?: FavouritePlacement
  visible?: boolean
}

export function Favourite({ slug, name, placement = 'inline', visible = false }: FavouriteProps) {
  const { isFavourite, toggleFavourite } = useFavourites()
  const active = isFavourite(slug)
  const label = name ?? 'gear'
  const className = [
    styles.button,
    placement === 'tile' ? styles.tile : '',
    active ? styles.filled : '',
    visible ? styles.shown : '',
    placement === 'tile' && !active && !visible ? styles.concealed : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={className}
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${label} from favourites` : `Favourite ${label}`}
      onClick={() => toggleFavourite(slug)}
    >
      {createElement('wa-icon', {
        name: 'heart',
        family: 'classic',
        variant: active ? 'solid' : 'regular',
      })}
    </button>
  )
}
