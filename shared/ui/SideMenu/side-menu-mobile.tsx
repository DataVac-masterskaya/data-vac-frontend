'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { isNavItemActive, NAV_ITEMS } from './nav-config'
import { sideMenuFont } from './side-menu-font'
import { SideMenuNavLink } from './side-menu-nav-link'
import { SideMenuSupportButton } from './side-menu-support-button'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusableElements(root: HTMLElement | null): HTMLElement[] {
  if (!root) {
    return []
  }

  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute('disabled') && element.tabIndex !== -1,
  )
}

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

type CloseOptions = {
  returnFocus?: boolean
}

export function SideMenuMobile() {
  const pathname = usePathname()
  const drawerId = useId()
  const fabRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLElement>(null)
  const returnFocusRef = useRef(false)
  const [open, setOpen] = useState(false)

  const close = useCallback((options?: CloseOptions) => {
    returnFocusRef.current = options?.returnFocus ?? true
    setOpen(false)
  }, [])

  useEffect(() => {
    returnFocusRef.current = false
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) {
      if (returnFocusRef.current) {
        fabRef.current?.focus()
      }
      returnFocusRef.current = false
      return
    }

    const focusables = getFocusableElements(drawerRef.current)
    focusables[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close({ returnFocus: true })
        return
      }

      if (event.key !== 'Tab' || !drawerRef.current) {
        return
      }

      const elements = getFocusableElements(drawerRef.current)
      if (elements.length === 0) {
        return
      }

      const first = elements[0]
      const last = elements[elements.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as Node | null
      if (!drawerRef.current?.contains(target)) {
        const elements = getFocusableElements(drawerRef.current)
        elements[0]?.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
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
        onClick={() => close({ returnFocus: true })}
      />

      <nav
        ref={drawerRef}
        id={drawerId}
        role="dialog"
        aria-modal={open}
        aria-label="Основные разделы"
        aria-hidden={!open}
        tabIndex={-1}
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
            onNavigate={() => close({ returnFocus: false })}
          />
        ))}

        <SideMenuSupportButton variant="mobile" onNavigate={() => close({ returnFocus: false })} />
      </nav>

      <button
        ref={fabRef}
        type="button"
        aria-expanded={open}
        aria-controls={drawerId}
        aria-haspopup="dialog"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        className="fixed bottom-6 left-1/2 z-50 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-accent text-white shadow-md outline-none transition-colors hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        onClick={() => {
          if (open) {
            close({ returnFocus: true })
          } else {
            setOpen(true)
          }
        }}
      >
        <MenuIcon />
      </button>
    </div>
  )
}
