import type { Metadata } from 'next'
import { QueryProvider } from '@/shared/providers/query-provider'
import { UIKitProvider } from '@/shared/providers/ui-kit-provider'
import { AppHeader } from '@/shared/ui/app-header'
import { ResponsiveSideMenuSlot } from '@/shared/ui/SideMenu/responsive-side-menu-slot'
import './globals.css'
import '@datavac/ui-kit/style.css'

export const metadata: Metadata = {
  title: 'DataVac — справочник вакцин',
  description: 'Справочная информация о вакцинах, инфекциях, противопоказаниях и ингредиентах',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('datavac-theme')||'light';document.documentElement.classList.toggle('dark',t==='dark')})()`,
          }}
        />
      </head>
      <body className="min-h-dvh flex bg-page text-fg">
        <UIKitProvider>
          <div className="flex min-h-dvh w-full">
            <ResponsiveSideMenuSlot slot="desktop" />
            <main className="flex-1 flex flex-col min-w-0">
              <AppHeader />
              <div className="px-6 pt-4">
                <ResponsiveSideMenuSlot slot="tablet" />
              </div>
              <div className="flex-1 p-6">
                <QueryProvider>{children}</QueryProvider>
              </div>
            </main>
          </div>
        </UIKitProvider>
      </body>
    </html>
  )
}
