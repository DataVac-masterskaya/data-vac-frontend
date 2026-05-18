'use client'

import { SideMenuContent } from './side-menu-content'

export function SideMenu() {
  return (
    <aside className="flex h-dvh min-h-dvh w-[216px] shrink-0 flex-col overflow-hidden rounded-2xl border-r border-border bg-card p-1">
      <SideMenuContent />
    </aside>
  )
}
