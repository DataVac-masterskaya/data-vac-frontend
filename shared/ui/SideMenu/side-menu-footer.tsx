'use client'

import Image from 'next/image'
import Link from 'next/link'
import supportSpiral from './icons/spiral.svg'
import {
  SIDE_MENU_DESKTOP_SUPPORT_BUTTON_CLASS,
  SIDE_MENU_TABLET_LABEL_CLASS,
  SUPPORT_BUTTON_LABEL,
} from './nav-config'

const FOOTER_LINK_CLASS_NAME = 'underline underline-offset-2 transition-colors hover:text-[#000000]'

type FooterLinkItem = {
  href: string
  label: string
}

const FOOTER_LINKS: FooterLinkItem[] = [
  { href: '/#about', label: 'О нас' },
  { href: '/support', label: 'Обратная связь' },
  { href: '/#about', label: 'АНО «Коллективный иммунитет»' },
  { href: '/#privacy', label: 'Все права защищены' },
  { href: '/#privacy', label: 'Политика конфиденциальности' },
]

type FooterLinkProps = FooterLinkItem

function FooterLink({ href, label }: FooterLinkProps) {
  return (
    <Link href={href} className={FOOTER_LINK_CLASS_NAME}>
      {label}
    </Link>
  )
}

export type SideMenuFooterProps = {
  mode?: 'desktop' | 'tablet'
  showSupportText?: boolean
  showFooter?: boolean
}

export function SideMenuFooter({
  mode = 'desktop',
  showSupportText = true,
  showFooter = true,
}: SideMenuFooterProps) {
  if (!showSupportText && !showFooter) {
    return null
  }

  const isTablet = mode === 'tablet'

  return (
    <div className={isTablet ? 'shrink-0' : 'mt-auto shrink-0'}>
      <footer className={isTablet ? 'relative flex' : 'relative flex h-[232px] w-[208px] flex-col'}>
        {!isTablet ? (
          <div className="pointer-events-none absolute left-[76px] top-[7px] z-10 h-[60px] w-[60px]">
            <Image src={supportSpiral} alt="" aria-hidden className="h-full w-full object-contain" />
          </div>
        ) : null}
        <Link
          href="/support"
          aria-label={showSupportText ? undefined : SUPPORT_BUTTON_LABEL}
          className={[
            isTablet
              ? `relative z-0 flex h-10 min-w-0 w-[153px] shrink-0 items-center justify-center rounded-xl bg-[#E30C5C] px-2 ${SIDE_MENU_TABLET_LABEL_CLASS} text-white outline-none transition-colors hover:bg-[#B40A49] focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-page`
              : `relative z-0 mt-[37px] flex h-[90px] w-[208px] shrink-0 items-center justify-center rounded-xl bg-[#E30C5C] ${SIDE_MENU_DESKTOP_SUPPORT_BUTTON_CLASS} text-white shadow-sm outline-none transition-colors hover:bg-[#B40A49] focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-card`,
          ].join(' ')}
        >
          {showSupportText ? (
            isTablet ? (
              <span className="min-w-0 truncate" title={SUPPORT_BUTTON_LABEL}>
                {SUPPORT_BUTTON_LABEL}
              </span>
            ) : (
              SUPPORT_BUTTON_LABEL
            )
          ) : null}
        </Link>

        {showFooter && !isTablet ? (
          <div className="flex min-h-0 flex-1 flex-col gap-1 pt-2 pl-1 text-xs text-[#868686]">
            {FOOTER_LINKS.map((item) => (
              <FooterLink key={`${item.href}-${item.label}`} href={item.href} label={item.label} />
            ))}
          </div>
        ) : null}
      </footer>
    </div>
  )
}
