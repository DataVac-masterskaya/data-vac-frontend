'use client'

import Link from 'next/link'
import {
  SIDE_MENU_DESKTOP_SUPPORT_BUTTON_CLASS,
  SIDE_MENU_FOCUS_RING_CARD_CLASS,
  SIDE_MENU_FOCUS_RING_PAGE_CLASS,
  SIDE_MENU_TABLET_LABEL_CLASS,
  SUPPORT_HREF,
  SUPPORT_LABEL_BY_VARIANT,
} from './nav-config'

export type SideMenuSupportButtonVariant = 'desktop' | 'tablet' | 'mobile'

export type SideMenuSupportButtonProps = {
  variant: SideMenuSupportButtonVariant
  showText?: boolean
  onNavigate?: () => void
}

function getButtonClassName(variant: SideMenuSupportButtonVariant): string {
  if (variant === 'mobile') {
    return [
      'flex h-10 items-center justify-center rounded-xl bg-accent px-4',
      'text-[14px] font-medium leading-[1.3] text-white outline-none transition-colors',
      'hover:bg-accent-hover',
      SIDE_MENU_FOCUS_RING_PAGE_CLASS,
    ].join(' ')
  }
  if (variant === 'tablet') {
    return [
      'relative z-0 flex h-10 min-w-0 w-[153px] shrink-0 items-center justify-center rounded-xl bg-accent px-2',
      SIDE_MENU_TABLET_LABEL_CLASS,
      'text-white outline-none transition-colors hover:bg-accent-hover',
      SIDE_MENU_FOCUS_RING_PAGE_CLASS,
    ].join(' ')
  }
  return [
    'relative z-0 mt-[37px] flex h-[90px] w-[208px] shrink-0 items-center justify-center rounded-xl bg-accent',
    SIDE_MENU_DESKTOP_SUPPORT_BUTTON_CLASS,
    'text-white shadow-sm outline-none transition-colors hover:bg-accent-hover',
    SIDE_MENU_FOCUS_RING_CARD_CLASS,
  ].join(' ')
}

export function SideMenuSupportButton({
  variant,
  showText = true,
  onNavigate,
}: SideMenuSupportButtonProps) {
  const label = SUPPORT_LABEL_BY_VARIANT[variant]

  return (
    <Link
      href={SUPPORT_HREF}
      onClick={onNavigate}
      aria-label={showText ? undefined : label}
      className={getButtonClassName(variant)}
    >
      {showText ? (
        variant === 'tablet' ? (
          <span className="min-w-0 truncate" title={label}>
            {label}
          </span>
        ) : (
          label
        )
      ) : null}
    </Link>
  )
}
