'use client'

import Image from 'next/image'
import Link from 'next/link'
import supportSpiral from './icons/spiral.svg'
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
      <footer className="relative flex h-[232px] w-[208px] flex-col">
        <div className="pointer-events-none absolute left-[76px] top-[7px] z-10 h-[60px] w-[60px]">
          <Image src={supportSpiral} alt="" aria-hidden className="h-full w-full object-contain" />
        </div>
        <Link
          href="/support"
          aria-label={showSupportText ? undefined : SUPPORT_BUTTON_LABEL}
          className={[
            'relative z-0 mt-[37px] flex h-[90px] w-[208px] shrink-0 items-center justify-center rounded-xl bg-[#E30C5C] text-center text-[16px] font-medium leading-[1.1] tracking-normal text-white shadow-sm outline-none transition-colors hover:bg-[#B40A49] focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-card',
          ].join(' ')}
        >
          {showSupportText ? SUPPORT_BUTTON_LABEL : null}
        </Link>

        {showFooter ? (
          <div className="flex min-h-0 flex-1 flex-col gap-1 pt-2 pl-1 text-xs text-[#868686]">
            <Link href="/#about" className="underline underline-offset-2 transition-colors hover:text-[#000000]">
              О нас
            </Link>
            <Link href="/support" className="underline underline-offset-2 transition-colors hover:text-[#000000]">
              Обратная связь
            </Link>
            <p className="leading-snug">{COPYRIGHT}</p>
            <Link href="/#privacy" className="underline underline-offset-2 transition-colors hover:text-[#000000]">
              Политика конфиденциальности
            </Link>
          </div>
        ) : null}
      </footer>
    </div>
  )
}
