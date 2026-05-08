import type { Metadata } from 'next'
import { QueryProvider } from '@/shared/providers/query-provider'
import { UIKitProvider } from '@/shared/providers/ui-kit-provider'
import { AppHeader } from '@/shared/ui/app-header'
import '@datavac/ui-kit/style.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'DataVac — справочник вакцин',
  description: 'Справочная информация о вакцинах, инфекциях, противопоказаниях и ингредиентах',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('datavac-theme')||'light';document.documentElement.classList.toggle('dark',t==='dark')})()`,
          }}
        />
      </head>
      <body className="min-h-full flex bg-page text-fg">
        <UIKitProvider>
          <aside className="w-16 shrink-0 bg-card border-r border-border flex flex-col items-center py-6 gap-4">
            <div className="w-8 h-8 bg-accent rounded-lg" title="DataVac" />
            <nav className="flex flex-col gap-3 mt-4">
              {[
                { href: '/', label: 'Главная' },
                { href: '/vaccines', label: 'Вакцины' },
                { href: '/infections', label: 'Инфекции' },
                { href: '/ingredients', label: 'Ингредиенты' },
                { href: '/contraindications', label: 'Противопоказания' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-subtle flex items-center justify-center text-[10px] text-fg-secondary hover:bg-accent/10"
                  title={label}
                >
                  {label.slice(0, 1)}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href="/support"
                className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-[10px]"
                title="Поддержать"
              >
                ♥
              </a>
            </div>
          </aside>

          <main className="flex-1 flex flex-col">
            <AppHeader />
            <div className="flex-1 p-6">
              <QueryProvider>{children}</QueryProvider>
            </div>
          </main>
        </UIKitProvider>
      </body>
    </html>
  )
}
