'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { DECORATIVE_SHAPES } from '@/shared/ui/decorative-shapes'
import {
  NOT_FOUND_SPHERE_CONFIGS,
  NOT_FOUND_HONEYCOMB_IMAGE_CLASSNAME,
  NOT_FOUND_HONEYCOMB_PARALLAX,
} from './not-found-layout'

type QuickSetter = (value: number) => void
type Vector = { x: number; y: number }

const SPHERE_IDS = [...NOT_FOUND_SPHERE_CONFIGS.map(({ id }) => id), 'honeycomb'] as const

export function NotFoundDecorativeSpheres() {
  const wrapperRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const imageRefs = useRef<Record<string, HTMLImageElement | null>>({})

  useEffect(() => {
    const parallaxById: Record<string, Vector> = { honeycomb: NOT_FOUND_HONEYCOMB_PARALLAX }
    NOT_FOUND_SPHERE_CONFIGS.forEach(({ id, parallax }) => {
      parallaxById[id] = parallax
    })

    const parallaxSetters: Record<string, { x: QuickSetter; y: QuickSetter }> = {}
    Object.entries(imageRefs.current).forEach(([id, el]) => {
      if (!el) return
      parallaxSetters[id] = {
        x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }),
      }
    })

    function handleMouseMove(event: MouseEvent) {
      const relativeX = event.clientX / window.innerWidth - 0.5
      const relativeY = event.clientY / window.innerHeight - 0.5

      Object.entries(parallaxSetters).forEach(([id, setter]) => {
        const parallax = parallaxById[id] ?? { x: 15, y: 15 }
        setter.x(relativeX * parallax.x)
        setter.y(relativeY * parallax.y)
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    const floatTweens = SPHERE_IDS.map((id, index) => {
      const el = wrapperRefs.current[id]
      if (!el) return null
      return gsap.to(el, {
        y: 14 + index * 4,
        x: index % 2 === 0 ? 8 : -8,
        duration: 3 + index * 0.6,
        delay: index * 0.25,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      floatTweens.forEach((tween) => tween?.kill())
    }
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden
    >
      {NOT_FOUND_SPHERE_CONFIGS.map(({ id, className }) => (
        <div
          key={id}
          ref={(el) => {
            wrapperRefs.current[id] = el
          }}
          className={className}
        >
          <img
            ref={(el) => {
              imageRefs.current[id] = el
            }}
            src={DECORATIVE_SHAPES[id].src}
            alt=""
            className="absolute inset-0 h-full w-full max-w-none object-contain will-change-transform"
          />
        </div>
      ))}

      <div
        ref={(el) => {
          wrapperRefs.current.honeycomb = el
        }}
        className={NOT_FOUND_HONEYCOMB_IMAGE_CLASSNAME}
      >
        <img
          ref={(el) => {
            imageRefs.current.honeycomb = el
          }}
          src={DECORATIVE_SHAPES.honeycomb.src}
          alt=""
          className="absolute inset-0 h-full w-full max-w-none object-contain will-change-transform"
        />
      </div>
    </div>
  )
}
