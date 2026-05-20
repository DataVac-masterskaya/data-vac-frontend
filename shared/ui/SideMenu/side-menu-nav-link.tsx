'use client'

import Link from 'next/link'
import type { NavIconId } from './nav-config'
import {
  SIDE_MENU_DESKTOP_NAV_CLASS,
  SIDE_MENU_FOCUS_RING_CARD_CLASS,
  SIDE_MENU_FOCUS_RING_PAGE_CLASS,
  SIDE_MENU_MOBILE_NAV_LINK_CLASS,
  SIDE_MENU_NAV_ICON_BASE_CLASS,
  SIDE_MENU_NAV_ICON_HIGHLIGHTED_CLASS,
  SIDE_MENU_NAV_ICON_IDLE_CLASS,
  SIDE_MENU_TABLET_LABEL_CLASS,
} from './nav-config'
import { NavGlyph } from './nav-glyph'

export type SideMenuNavLinkVariant = 'desktop' | 'tablet' | 'mobile'

export type SideMenuNavLinkProps = {
  href: string
  label: string
  icon: NavIconId
  active: boolean
  variant: SideMenuNavLinkVariant
  highlighted?: boolean
  showLabel?: boolean
  onNavigate?: () => void
  onMouseEnter?: () => void
}

function getLinkClassName(variant: SideMenuNavLinkVariant): string {
  if (variant === 'mobile') {
    return SIDE_MENU_MOBILE_NAV_LINK_CLASS
  }
  if (variant === 'tablet') {
    return [
      'flex h-10 min-w-0 flex-1 basis-0 items-center gap-2 rounded-xl bg-card px-3',
      SIDE_MENU_TABLET_LABEL_CLASS,
      'text-fg outline-none transition-colors',
      SIDE_MENU_FOCUS_RING_PAGE_CLASS,
    ].join(' ')
  }
  return [
    'flex items-center gap-2 rounded-xl py-2 pl-4 pr-2',
    SIDE_MENU_DESKTOP_NAV_CLASS,
    'text-fg outline-none transition-colors',
    SIDE_MENU_FOCUS_RING_CARD_CLASS,
  ].join(' ')
}

export function SideMenuNavLink({
  href,
  label,
  icon,
  active,
  variant,
  highlighted = active,
  showLabel = true,
  onNavigate,
  onMouseEnter,
}: SideMenuNavLinkProps) {
  const iconHighlighted = variant === 'mobile' ? false : highlighted

  return (
    <Link
      href={href}
      onClick={onNavigate}
      onMouseEnter={onMouseEnter}
      aria-current={active ? 'page' : undefined}
      aria-label={showLabel ? undefined : label}
      className={getLinkClassName(variant)}
    >
      <span
        className={[
          SIDE_MENU_NAV_ICON_BASE_CLASS,
          iconHighlighted ? SIDE_MENU_NAV_ICON_HIGHLIGHTED_CLASS : SIDE_MENU_NAV_ICON_IDLE_CLASS,
        ].join(' ')}
      >
        <NavGlyph id={icon} />
      </span>
      {showLabel ? (
        variant === 'tablet' ? (
          <span className="min-w-0 flex-1 truncate" title={label}>
            {label}
          </span>
        ) : (
          label
        )
      ) : null}
    </Link>
  )
}
