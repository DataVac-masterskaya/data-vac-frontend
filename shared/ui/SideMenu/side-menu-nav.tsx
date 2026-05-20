'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  isNavItemActive,
  NAV_ITEMS,
  SIDE_MENU_DESKTOP_NAV_CLASS,
  SIDE_MENU_TABLET_LABEL_CLASS,
} from './nav-config'
import { NavGlyph } from './nav-glyph'

export type SideMenuNavProps = {
  orientation?: 'vertical' | 'horizontal'
  showLabels?: boolean
}

export function SideMenuNav({
  orientation = 'vertical',
  showLabels = true,
}: SideMenuNavProps) {
  const pathname = usePathname()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const isHorizontal = orientation === 'horizontal'

  return (
    <nav
      className={[
        isHorizontal
          ? 'flex min-w-0 flex-1 flex-nowrap items-center gap-2'
          : 'mt-[23px] flex w-[208px] flex-col gap-1',
      ].join(' ')}
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
              isHorizontal
                ? `flex h-10 min-w-0 flex-1 basis-0 items-center gap-2 rounded-xl bg-[#FFFFFF] px-3 ${SIDE_MENU_TABLET_LABEL_CLASS} outline-none transition-colors`
                : `flex items-center gap-2 rounded-xl py-2 pl-4 pr-2 ${SIDE_MENU_DESKTOP_NAV_CLASS} outline-none transition-colors`,
              'text-[#323335]',
              isHorizontal
                ? 'focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-page'
                : 'focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-card',
            ].join(' ')}
          >
            <span
              className={[
                'flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-out',
                highlighted
                  ? 'bg-[#E30C5C] text-[#FFFCFC]'
                  : 'bg-[#F3F3F3] text-fg-secondary',
              ].join(' ')}
            >
              <NavGlyph id={icon} />
            </span>
            {showLabels ? (
              isHorizontal ? (
                <span className="min-w-0 flex-1 truncate" title={label}>
                  {label}
                </span>
              ) : (
                label
              )
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}
