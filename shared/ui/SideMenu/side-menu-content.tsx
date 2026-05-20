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
  mode?: 'desktop' | 'tablet'
  showLabels?: boolean
  showCaption?: boolean
  showSupportText?: boolean
  showFooter?: boolean
  className?: string
}

export function SideMenuContent({
  mode = 'desktop',
  showLabels = true,
  showCaption = true,
  showSupportText = true,
  showFooter = true,
  className,
}: SideMenuContentProps) {
  const isTablet = mode === 'tablet'

  return (
    <div
      className={[
        interTight.className,
        isTablet ? 'flex min-h-0 min-w-0 flex-1 flex-col font-normal' : 'flex min-h-0 flex-1 flex-col font-normal',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {!isTablet ? (
        <div className="shrink-0 p-4">
          <DataVacLogo placement="sidebar" showText={showLabels} />
          {showCaption ? (
            <p className="mt-3 text-[10px] font-normal leading-[1.3] text-[#868686]">{SOURCE_CAPTION}</p>
          ) : null}
        </div>
      ) : null}

      {isTablet ? (
        <div className="flex min-w-0 items-center justify-between gap-3">
          <SideMenuNav showLabels={showLabels} orientation="horizontal" />
          <SideMenuFooter showSupportText={showSupportText} showFooter={showFooter} mode="tablet" />
        </div>
      ) : (
        <>
          <SideMenuNav showLabels={showLabels} orientation="vertical" />
          <SideMenuFooter showSupportText={showSupportText} showFooter={showFooter} mode="desktop" />
        </>
      )}
    </div>
  )
}
