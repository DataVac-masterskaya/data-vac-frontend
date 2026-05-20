'use client'

import { SIDE_MENU_WIDTH_PX } from './breakpoints'
import { SideMenuContent } from './side-menu-content'

export function SideMenuDesktop() {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 flex h-dvh flex-col overflow-hidden rounded-2xl border-r border-border bg-card p-1"
      style={{ width: SIDE_MENU_WIDTH_PX }}
    >
      <SideMenuContent mode="desktop" />
    </aside>
  )
}

export function SideMenuTablet() {
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
