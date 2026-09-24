import { useEffect, useRef, useState } from 'react'
import {
  DEFAULT_THUMBNAIL_URL,
  resolveThumbnailUrl,
} from '#/lib/catalog/resolve-thumbnail-url'
import type { CatalogKind } from '#/types/catalog'
import styles from './ThumbnailImage.module.css'

export type ThumbnailImageProps = {
  catalogKind: CatalogKind
  slug: string
  size?: 'card' | 'tile' | 'fill'
}

export function ThumbnailImage({ catalogKind, slug, size = 'card' }: ThumbnailImageProps) {
  const resolvedUrl = resolveThumbnailUrl(catalogKind, slug)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const src = failedSrc === resolvedUrl ? DEFAULT_THUMBNAIL_URL : resolvedUrl
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const node = imgRef.current
    if (!node || src === DEFAULT_THUMBNAIL_URL) {
      return
    }
    if (node.complete && node.naturalWidth === 0) {
      setFailedSrc(resolvedUrl)
    }
  }, [resolvedUrl, src])

  return (
    <div className={`${styles.media} ${styles[size]}`}>
      <img
        ref={imgRef}
        className={`${styles.image} ${styles[size]}`}
        src={src}
        alt=""
        onError={() => {
          if (src !== DEFAULT_THUMBNAIL_URL) {
            setFailedSrc(resolvedUrl)
          }
        }}
      />
    </div>
  )
}
