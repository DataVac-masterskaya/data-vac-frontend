'use client'

import { cn } from '@datavac/ui-kit'
import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD_PX = 200

function ArrowUpIcon() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      aria-hidden
      className="size-6 text-white"
    >
      <path d="M12 5 7 10h3v9h4v-9h3l-5-5Z" fill="currentColor" />
    </svg>
  )
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD_PX)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Наверх"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full bg-accent text-white',
        'outline-none transition-opacity duration-200 hover:bg-accent-hover',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <ArrowUpIcon />
    </button>
  )
}
