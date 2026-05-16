'use client'

import { SideMenuContent } from './side-menu-content'

export function SideMenu() {
  return (
    <aside
      className={[
        'flex w-[272px] shrink-0 flex-col rounded-2xl border-r border-border bg-card px-5 py-6 shadow-sm',
        'xl:w-[216px] xl:sticky xl:top-4 xl:max-h-[calc(100dvh-2rem)] xl:self-start xl:px-4',
      ].join(' ')}
    >
      <SideMenuContent />
    </aside>
  )
}
