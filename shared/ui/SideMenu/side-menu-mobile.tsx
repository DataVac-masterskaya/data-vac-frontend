'use client'

import { Inter_Tight } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useState } from 'react'
import {
  isNavItemActive,
  MOBILE_SUPPORT_BUTTON_LABEL,
  NAV_ITEMS,
} from './nav-config'
import { NavGlyph } from './nav-glyph'

const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
})

function MenuIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden className="size-5">
      <path
        d="M4 6H16M4 10H16M4 14H16"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SideMenuMobile() {
  const pathname = usePathname()
  const drawerId = useId()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  return (
    <div className={interTight.className}>
      <div
        role="presentation"
        aria-hidden={!open}
        className={[
          'fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={close}
      />

      <nav
        id={drawerId}
        aria-label="Основные разделы"
        aria-hidden={!open}
        className={[
          'fixed bottom-[72px] left-1/2 z-50 flex w-[min(100%-2rem,320px)] -translate-x-1/2 flex-col gap-2',
          'transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none',
          open
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0 motion-reduce:translate-y-0',
        ].join(' ')}
      >
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = isNavItemActive(pathname, href)

          return (
            <Link
              key={href}
              href={href}
              onClick={close}
              aria-current={active ? 'page' : undefined}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-[14px] font-normal leading-[1.3] text-[#323335] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#F3F3F3] text-fg-secondary">
                <NavGlyph id={icon} />
              </span>
              {label}
            </Link>
          )
        })}

        <Link
          href="/support"
          onClick={close}
          className="flex h-10 items-center justify-center rounded-xl bg-[#E30C5C] px-4 text-[14px] font-medium leading-[1.3] text-white outline-none transition-colors hover:bg-[#B40A49] focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          {MOBILE_SUPPORT_BUTTON_LABEL}
        </Link>
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={drawerId}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        className="fixed bottom-6 left-1/2 z-50 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#E30C5C] text-white shadow-md outline-none transition-colors hover:bg-[#B40A49] focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        onClick={() => setOpen((value) => !value)}
      >
        <MenuIcon />
      </button>
    </div>
  )
}
