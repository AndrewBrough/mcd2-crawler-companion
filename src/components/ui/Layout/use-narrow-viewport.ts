import { useEffect, useState } from 'react'

const NARROW_VIEWPORT = '(max-width: 640px)'

export function useNarrowViewport() {
  const [narrow, setNarrow] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(NARROW_VIEWPORT)
    const update = () => setNarrow(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return narrow
}
