'use client'

import Link from 'next/link'
import { COPYRIGHT, SUPPORT_BUTTON_LABEL } from './nav-config'

export type SideMenuFooterProps = {
  showSupportText?: boolean
  showFooter?: boolean
}

export function SideMenuFooter({
  showSupportText = true,
  showFooter = true,
}: SideMenuFooterProps) {
  if (!showSupportText && !showFooter) {
    return null
  }

  return (
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
          <div className="flex min-h-0 flex-1 flex-col gap-1 pt-2 pl-1 text-xs text-[#868686]">
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
  )
}
