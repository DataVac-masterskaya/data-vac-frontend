'use client'

import { Header } from '@/shared/ui/Header'
import { SIDE_MENU_WIDTH_PX } from './breakpoints'
import { SideMenuDesktop, SideMenuTablet } from './side-menu'
import { SideMenuMobile } from './side-menu-mobile'
import { useSideMenuMode } from './use-side-menu-mode'

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const mode = useSideMenuMode()

  return (
    <div className="flex min-h-dvh w-full">
      {mode === 'desktop' ? <SideMenuDesktop /> : null}
      {mode === 'desktop' ? (
        <div className="shrink-0" style={{ width: SIDE_MENU_WIDTH_PX }} aria-hidden />
      ) : null}

      <main className="flex min-w-0 flex-1 flex-col">
        <Header />
        {mode === 'tablet' ? (
          <div className="px-6 pt-4">
            <SideMenuTablet />
          </div>
        ) : null}
        <div className="flex-1 p-6">{children}</div>
      </main>

      {mode === 'mobile' ? <SideMenuMobile /> : null}
    </div>
  )
}
