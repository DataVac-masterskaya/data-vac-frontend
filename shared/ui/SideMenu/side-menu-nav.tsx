'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { isNavItemActive, NAV_ITEMS } from './nav-config'
import { NavGlyph } from './nav-glyph'

export type SideMenuNavProps = {
  showLabels?: boolean
}

export function SideMenuNav({ showLabels = true }: SideMenuNavProps) {
  const pathname = usePathname()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

  return (
    <nav
      className="mt-[23px] flex w-[208px] flex-col gap-1"
      aria-label="Основные разделы"
      onMouseLeave={() => setHoveredHref(null)}
    >
      {NAV_ITEMS.map(({ href, label, icon }) => {
        const active = isNavItemActive(pathname, href)
        const highlighted = hoveredHref !== null ? href === hoveredHref : active

        return (
          <Link
            key={href}
            href={href}
            onMouseEnter={() => setHoveredHref(href)}
            aria-current={active ? 'page' : undefined}
            aria-label={showLabels ? undefined : label}
            className={[
              'flex items-center gap-2 rounded-xl py-2 pl-4 pr-2 text-[16px] font-normal outline-none transition-colors',
              'text-[#323335]',
              'focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-card',
            ].join(' ')}
          >
            <span
              className={[
                'flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-out',
                highlighted
                  ? 'bg-[#E30C5C] text-[#FFFCFC]'
                  : 'bg-transparent text-fg-secondary',
              ].join(' ')}
            >
              <NavGlyph id={icon} />
            </span>
            {showLabels ? label : null}
          </Link>
        )
      })}
    </nav>
  )
}
