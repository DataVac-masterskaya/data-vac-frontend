'use client'

import Image from 'next/image'
import Link from 'next/link'
import supportSpiral from './icons/spiral.svg'
import { SideMenuSupportButton } from './side-menu-support-button'

const FOOTER_LINK_CLASS_NAME = 'underline underline-offset-2 transition-colors hover:text-fg'

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
        <SideMenuSupportButton variant={isTablet ? 'tablet' : 'desktop'} showText={showSupportText} />

        {showFooter && !isTablet ? (
          <div className="flex min-h-0 flex-1 flex-col gap-1 pt-2 pl-1 text-xs text-fg-muted">
            {FOOTER_LINKS.map((item) => (
              <FooterLink key={`${item.href}-${item.label}`} href={item.href} label={item.label} />
            ))}
          </div>
        ) : null}
      </footer>
    </div>
  )
}
