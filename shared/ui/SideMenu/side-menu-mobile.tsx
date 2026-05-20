'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useState } from 'react'
import { isNavItemActive, NAV_ITEMS } from './nav-config'
import { sideMenuFont } from './side-menu-font'
import { SideMenuNavLink } from './side-menu-nav-link'
import { SideMenuSupportButton } from './side-menu-support-button'

function MenuIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden className="size-5">
      <path
        d="M4 6H16M4 10H16M4 14H16"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SideMenuMobile() {
  const pathname = usePathname()
  const drawerId = useId()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    close()
  }, [pathname, close])

  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  return (
    <div className={sideMenuFont.className}>
      <div
        role="presentation"
        aria-hidden={!open}
        className={[
          'fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={close}
      />

      <nav
        id={drawerId}
        aria-label="Основные разделы"
        aria-hidden={!open}
        className={[
          'fixed bottom-[72px] left-1/2 z-50 flex w-[min(100%-2rem,320px)] -translate-x-1/2 flex-col gap-2',
          'transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none',
          open
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0 motion-reduce:translate-y-0',
        ].join(' ')}
      >
        {NAV_ITEMS.map(({ href, label, icon }) => (
          <SideMenuNavLink
            key={href}
            href={href}
            label={label}
            icon={icon}
            active={isNavItemActive(pathname, href)}
            variant="mobile"
            onNavigate={close}
          />
        ))}

        <SideMenuSupportButton variant="mobile" onNavigate={close} />
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={drawerId}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        className="fixed bottom-6 left-1/2 z-50 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-accent text-white shadow-md outline-none transition-colors hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        onClick={() => setOpen((value) => !value)}
      >
        <MenuIcon />
      </button>
    </div>
  )
}
