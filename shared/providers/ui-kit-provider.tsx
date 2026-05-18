'use client'
import { useEffect } from 'react'
import { ThemeProvider } from '@datavac/ui-kit'
import type { ReactNode } from 'react'

export function UIKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const theme = localStorage.getItem('datavac-theme') || 'light'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  return <ThemeProvider>{children}</ThemeProvider>
}
