'use client'

import { ReactNode } from 'react'
import { Header } from '@/shared/ui/Header'
import { Footer } from '@/shared/ui/Footer'
import { ScrollToTopButton } from '@/shared/ui/ScrollToTopButton'
import { SideMenuDesktop } from '@/shared/ui/SideMenu/side-menu'
import { SideMenuMobile } from '@/shared/ui/SideMenu/side-menu-mobile'
import { useSideMenuMode } from '@/shared/ui/SideMenu/use-side-menu-mode'
import { SIDE_MENU_WIDTH_PX } from '@/shared/ui/SideMenu/breakpoints'

export type PageLayoutProps = {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  const mode = useSideMenuMode()

  return (
    <div className="flex min-h-dvh w-full p-2">
      {mode === 'desktop' && <SideMenuDesktop />}
      {mode === 'desktop' && (
        <div className="shrink-0" style={{ width: SIDE_MENU_WIDTH_PX }} aria-hidden />
      )}

      <main className="flex min-w-0 flex-1 flex-col w-full max-w-[1312px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <Header />

        <div className="flex-1 py-4 sm:py-6 md:py-8 lg:py-12">
          {children}
        </div>

        <Footer />
        {mode === 'mobile' && <SideMenuMobile />}
        <ScrollToTopButton />
      </main>
    </div>
  )
}
