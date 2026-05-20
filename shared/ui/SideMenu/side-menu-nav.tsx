'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { isNavItemActive, NAV_ITEMS } from './nav-config'
import { SideMenuNavLink } from './side-menu-nav-link'

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
  const variant = isHorizontal ? 'tablet' : 'desktop'

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
          <SideMenuNavLink
            key={href}
            href={href}
            label={label}
            icon={icon}
            active={active}
            variant={variant}
            highlighted={highlighted}
            showLabel={showLabels}
            onMouseEnter={() => setHoveredHref(href)}
          />
        )
      })}
    </nav>
  )
}
