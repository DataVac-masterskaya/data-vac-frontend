'use client'

import { SideMenuContent } from './side-menu-content'
import { SideMenuMobile } from './side-menu-mobile'

type SideMenuMode = 'desktop' | 'tablet' | 'mobile'

type SideMenuProps = {
  mode?: SideMenuMode
}

export function SideMenu({ mode = 'desktop' }: SideMenuProps) {
  if (mode === 'mobile') {
    return <SideMenuMobile />
  }

  if (mode === 'tablet') {
    return (
      <div className="flex h-10 min-w-0 items-center bg-page">
        <SideMenuContent
          mode="tablet"
          showLabels
          showCaption={false}
          showSupportText
          showFooter={false}
        />
      </div>
    )
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex h-dvh w-[216px] flex-col overflow-hidden rounded-2xl border-r border-border bg-card p-1">
      <SideMenuContent mode="desktop" />
    </aside>
  )
}
