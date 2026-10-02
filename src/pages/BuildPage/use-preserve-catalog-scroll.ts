import { useLayoutEffect, useRef } from 'react'

export function usePreserveCatalogScroll(catalogVisible: boolean) {
  const saved = useRef(0)

  function remember() {
    saved.current = window.scrollY
  }

  useLayoutEffect(() => {
    if (!catalogVisible || saved.current <= 0) {
      return
    }
    window.scrollTo(0, saved.current)
  }, [catalogVisible])

  return remember
}
