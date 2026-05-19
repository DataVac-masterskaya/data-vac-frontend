'use client'

import Image from 'next/image'
import Link from 'next/link'
import logoIcon from './logo-icon.svg'

export type LogoPlacement = 'sidebar' | 'header'

const visibilityByPlacement: Record<LogoPlacement, string> = {
  sidebar: 'flex',
  header: 'flex md:hidden',
}

export type DataVacLogoProps = {
  placement: LogoPlacement
  showText?: boolean
  className?: string
}

export function DataVacLogo({ placement, showText = true, className }: DataVacLogoProps) {
  return (
    <Link
      href="/"
      className={[
        'rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#E30C5C] focus-visible:ring-offset-2 focus-visible:ring-offset-card',
        visibilityByPlacement[placement],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={showText ? 'block shrink-0' : 'block w-[37px] shrink-0 overflow-hidden'}>
        <Image
          src={logoIcon}
          alt="DataVac"
          width={116}
          height={37}
          priority
          className="h-[37px] w-[116px] shrink-0"
        />
      </span>
    </Link>
  )
}
