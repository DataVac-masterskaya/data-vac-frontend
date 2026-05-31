'use client'

import { SIDE_MENU_WIDTH_PX } from './breakpoints'
import { SideMenuContent } from './side-menu-content'
import { useIsPortrait } from './use-orientation'

export function SideMenuDesktop() {
  return (
    <aside
      className="fixed inset-y-2 left-2 z-30 flex flex-col overflow-hidden rounded-2xl border-r border-border bg-card p-1"
      style={{ width: SIDE_MENU_WIDTH_PX }}
    >
      <SideMenuContent mode="desktop" />
    </aside>
  )
}

export function SideMenuTablet() {
  const isPortrait = useIsPortrait()

  return (
    <div className="flex h-10 min-w-0 items-center bg-page">
      <SideMenuContent
        mode="tablet"
        showLabels={!isPortrait}
        showCaption={false}
        showSupportText
        showFooter={false}
      />
    </div>
  )
}
