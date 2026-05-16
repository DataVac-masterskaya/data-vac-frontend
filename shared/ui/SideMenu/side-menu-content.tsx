'use client'

import Link from 'next/link'
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
    <div className={['flex flex-1 flex-col', className].filter(Boolean).join(' ')}>
      <div className="shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E30C5C] text-white text-lg font-semibold leading-none"
            aria-hidden
          >
            D
          </span>
          {showLabels ? (
            <span className="text-lg font-bold text-[#E30C5C] tracking-tight">DataVac</span>
          ) : null}
        </Link>
        {showCaption ? (
          <p className="mt-3 text-xs leading-snug text-fg-secondary">{SOURCE_CAPTION}</p>
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
                'flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium text-fg outline-none transition-colors',
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

      <div className="mt-auto flex flex-col gap-6 pt-8">
        <Link
          href="/support"
          aria-label={showSupportText ? undefined : SUPPORT_BUTTON_LABEL}
          className="flex w-full items-center justify-center rounded-xl bg-[#B40A49] px-4 py-3 text-sm font-semibold text-white shadow-sm outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          {showSupportText ? SUPPORT_BUTTON_LABEL : null}
        </Link>

        {showFooter ? (
          <footer className="flex flex-col gap-2 text-xs text-fg-muted">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <Link href="/#about" className="underline-offset-2 hover:underline">
                О нас
              </Link>
              <Link href="/support" className="underline-offset-2 hover:underline">
                Обратная связь
              </Link>
              <Link href="/#privacy" className="underline-offset-2 hover:underline">
                Политика конфиденциальности
              </Link>
            </div>
            <p className="leading-snug">{COPYRIGHT}</p>
          </footer>
        ) : null}
      </div>
    </div>
  )
}
