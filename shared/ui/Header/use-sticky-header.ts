'use client'

import { useEffect, useRef, useState } from 'react'

export type StickyHeaderVariant = 'expanded' | 'compact'

export function useStickyHeader(): StickyHeaderVariant {
  const [variant, setVariant] = useState<StickyHeaderVariant>('expanded')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY

      if (y <= 0) {
        setVariant('expanded')
      } else if (y > lastScrollY.current) {
        setVariant('compact')
      } else {
        setVariant('expanded')
      }

      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return variant
}
