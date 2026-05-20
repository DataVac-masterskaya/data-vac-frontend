'use client'

import { SideMenuContent } from './side-menu-content'

type SideMenuMode = 'desktop' | 'tablet'

type SideMenuProps = {
  mode?: SideMenuMode
}

export function SideMenu({ mode = 'desktop' }: SideMenuProps) {
  if (mode === 'tablet') {
    return (
      <div className="min-w-0 rounded-2xl border border-border bg-card p-2">
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
    <aside className="flex h-dvh min-h-dvh w-[216px] shrink-0 flex-col overflow-hidden rounded-2xl border-r border-border bg-card p-1">
      <SideMenuContent mode="desktop" />
    </aside>
  )
}
