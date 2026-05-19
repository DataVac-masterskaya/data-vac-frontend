'use client'

import Link from 'next/link'
import { Inter_Tight } from 'next/font/google'
import { DataVacLogo } from '@/shared/ui/Logo'
import { usePathname } from 'next/navigation'
import {
  ArrowsIcon,
  InfoCircleIcon,
  PlusIcon,
  SunIcon,
} from '@datavac/ui-kit'
import type { NavIconId } from './nav-config'
import {
  COPYRIGHT,
  isNavItemActive,
  NAV_ITEMS,
  SOURCE_CAPTION,
  SUPPORT_BUTTON_LABEL,
} from './nav-config'

const ICON_SIZE = { width: 20, height: 20 } as const

const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
})

function NavGlyph({ id }: { id: NavIconId }) {
  const props = { ...ICON_SIZE, 'aria-hidden': true as const }
  switch (id) {
    case 'vaccines':
      return <PlusIcon {...props} />
    case 'infections':
      return <SunIcon {...props} />
    case 'contraindications':
      return <ArrowsIcon {...props} />
    case 'ingredients':
      return <InfoCircleIcon {...props} />
  }
}

export type SideMenuContentProps = {
  showLabels?: boolean
  showCaption?: boolean
  showSupportText?: boolean
  showFooter?: boolean
  className?: string
}

export function SideMenuContent({
  showLabels = true,
  showCaption = true,
  showSupportText = true,
  showFooter = true,
  className,
}: SideMenuContentProps) {
  const pathname = usePathname()

  return (
    <div
      className={[
        interTight.className,
        'flex min-h-0 flex-1 flex-col font-normal',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="shrink-0 p-4 max-md:hidden">
        <DataVacLogo placement="sidebar" showText={showLabels} />
        {showCaption ? (
          <p className="mt-3 text-[10px] font-normal leading-[1.3] text-fg-secondary">{SOURCE_CAPTION}</p>
        ) : null}
      </div>

      <nav className="mt-8 flex flex-col gap-1" aria-label="Основные разделы">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = isNavItemActive(pathname, href)
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              aria-label={showLabels ? undefined : label}
              className={[
                'flex items-center gap-3 rounded-xl px-2 py-2.5 text-[16px] font-normal text-fg outline-none transition-colors',
                'hover:bg-subtle',
                'focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-card',
              ].join(' ')}
            >
              <span
                className={[
                  'flex size-10 shrink-0 items-center justify-center rounded-full transition-colors',
                  active ? 'bg-[#E30C5C] text-white' : 'bg-transparent text-fg-secondary',
                ].join(' ')}
              >
                <NavGlyph id={icon} />
              </span>
              {showLabels ? label : null}
            </Link>
          )
        })}
      </nav>

      {(showSupportText || showFooter) && (
        <div className="mt-auto shrink-0">
          <footer className="flex h-[232px] w-[208px] flex-col">
            <Link
              href="/support"
              aria-label={showSupportText ? undefined : SUPPORT_BUTTON_LABEL}
              className={[
                'mt-[37px] flex h-[90px] w-[208px] shrink-0 items-center justify-center rounded-xl bg-[#E30C5C] text-center text-[16px] font-medium leading-[1.1] tracking-normal text-white shadow-sm outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-card',
              ].join(' ')}
            >
              {showSupportText ? SUPPORT_BUTTON_LABEL : null}
            </Link>

            {showFooter ? (
              <div className="flex min-h-0 flex-1 flex-col gap-1 pt-2 pl-1 text-xs text-fg-muted">
                <Link href="/#about" className="underline underline-offset-2">
                  О нас
                </Link>
                <Link href="/support" className="underline underline-offset-2">
                  Обратная связь
                </Link>
                <p className="leading-snug">{COPYRIGHT}</p>
                <Link href="/#privacy" className="underline underline-offset-2">
                  Политика конфиденциальности
                </Link>
              </div>
            ) : null}
          </footer>
        </div>
      )}
    </div>
  )
}
