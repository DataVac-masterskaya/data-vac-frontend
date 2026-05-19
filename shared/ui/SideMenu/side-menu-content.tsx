'use client'

import { Inter_Tight } from 'next/font/google'
import { DataVacLogo } from '@/shared/ui/Logo'
import { SOURCE_CAPTION } from './nav-config'
import { SideMenuFooter } from './side-menu-footer'
import { SideMenuNav } from './side-menu-nav'

const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
})

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
          <p className="mt-3 text-[10px] font-normal leading-[1.3] text-[#868686]">{SOURCE_CAPTION}</p>
        ) : null}
      </div>

      <SideMenuNav showLabels={showLabels} />
      <SideMenuFooter showSupportText={showSupportText} showFooter={showFooter} />
    </div>
  )
}
