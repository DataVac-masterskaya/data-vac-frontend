'use client'
import { ThemeProvider } from '@datavac/ui-kit'
import type { ReactNode } from 'react'

export function UIKitProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
