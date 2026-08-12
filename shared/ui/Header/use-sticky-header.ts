'use client'

import { useEffect, useRef, useState } from 'react'

export type StickyHeaderVariant = 'expanded' | 'compact'

export function useStickyHeader(): StickyHeaderVariant {
  const [variant, setVariant] = useState<StickyHeaderVariant>('expanded')
  const variantRef = useRef<StickyHeaderVariant>('expanded')
  const lastScrollY = useRef(0)
  const lastDirection = useRef<'down' | 'up' | null>(null)
  const accumulatedDelta = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current

      if (y <= 10) {
        lastScrollY.current = y
        accumulatedDelta.current = 0
        lastDirection.current = null
        if (variantRef.current !== 'expanded') {
          variantRef.current = 'expanded'
          setVariant('expanded')
        }
        return
      }

      if (Math.abs(delta) < 12) {
        return
      }

      const direction = delta > 0 ? 'down' : 'up'
      if (direction !== lastDirection.current) {
        accumulatedDelta.current = 0
      }

      accumulatedDelta.current += Math.abs(delta)
      lastDirection.current = direction

      if (direction === 'down') {
        if (accumulatedDelta.current >= 40 && variantRef.current !== 'compact' && y > 80) {
          accumulatedDelta.current = 0
          variantRef.current = 'compact'
          setVariant('compact')
        }
      } else if (direction === 'up') {
        if (accumulatedDelta.current >= 80 && variantRef.current !== 'expanded') {
          accumulatedDelta.current = 0
          variantRef.current = 'expanded'
          setVariant('expanded')
        }
      }

      lastScrollY.current = y
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (variant !== 'compact') return
    const raf = requestAnimationFrame(() => {
      if (window.scrollY <= 10) {
        variantRef.current = 'expanded'
        setVariant('expanded')
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [variant])

  return variant
}
