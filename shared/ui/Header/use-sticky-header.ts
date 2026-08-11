'use client'

import { useEffect, useRef, useState } from 'react'

export type StickyHeaderVariant = 'expanded' | 'compact'

export function useStickyHeader(): StickyHeaderVariant {
  const [variant, setVariant] = useState<StickyHeaderVariant>('expanded')
  const lastScrollY = useRef(0)
  const lastDirection = useRef<'down' | 'up' | null>(null)
  const accumulatedDelta = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current

      if (Math.abs(delta) < 12) {
        return
      }

      const direction = delta > 0 ? 'down' : 'up'
      if (direction !== lastDirection.current) {
        accumulatedDelta.current = 0
      }

      accumulatedDelta.current += Math.abs(delta)
      lastDirection.current = direction

      if (y <= 0) {
        setVariant('expanded')
        accumulatedDelta.current = 0
      } else if (direction === 'down') {
        if (accumulatedDelta.current >= 40 && variant !== 'compact') {
          setVariant('compact')
          accumulatedDelta.current = 0
        }
      } else if (direction === 'up') {
        if (accumulatedDelta.current >= 80 && variant !== 'expanded') {
          setVariant('expanded')
          accumulatedDelta.current = 0
        }
      }

      lastScrollY.current = y
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  return variant
}
