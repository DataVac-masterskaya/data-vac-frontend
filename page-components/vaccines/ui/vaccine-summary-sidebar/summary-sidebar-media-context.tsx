'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import {
  useSummarySidebarMedia,
  type SummarySidebarLayout,
} from './use-summary-sidebar-media'

type SummarySidebarMediaContextValue = {
  layout: SummarySidebarLayout
  isWide: boolean
  isDesktop: boolean
  isTablet: boolean
  isMobile: boolean
}

const SummarySidebarMediaContext = createContext<SummarySidebarMediaContextValue | null>(null)

export function SummarySidebarMediaProvider({ children }: { children: ReactNode }) {
  const { layout, isWide } = useSummarySidebarMedia()

  const value = useMemo(
    () => ({
      layout,
      isWide,
      isDesktop: layout === 'desktop',
      isTablet: layout === 'tablet',
      isMobile: layout === 'mobile',
    }),
    [layout, isWide],
  )

  return (
    <SummarySidebarMediaContext.Provider value={value}>{children}</SummarySidebarMediaContext.Provider>
  )
}

export function useSummarySidebarMediaContext(): SummarySidebarMediaContextValue {
  const context = useContext(SummarySidebarMediaContext)
  if (!context) {
    throw new Error('useSummarySidebarMediaContext must be used within SummarySidebarMediaProvider')
  }
  return context
}
