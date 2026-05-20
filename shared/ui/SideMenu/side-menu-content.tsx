'use client'

import { DataVacLogo } from '@/shared/ui/Logo'
import { SOURCE_CAPTION } from './nav-config'
import { SideMenuFooter } from './side-menu-footer'
import { sideMenuFont } from './side-menu-font'
import { SideMenuNav } from './side-menu-nav'

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
        sideMenuFont.className,
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
            <p className="mt-3 text-[10px] font-normal leading-[1.3] text-fg-muted">{SOURCE_CAPTION}</p>
          ) : null}
        </div>
      ) : null}

      {isTablet ? (
        <div className="flex h-10 min-w-0 items-center justify-between gap-3 overflow-hidden">
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
