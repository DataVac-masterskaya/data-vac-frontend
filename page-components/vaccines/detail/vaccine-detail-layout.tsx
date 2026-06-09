'use client'

import {
  SUMMARY_SIDEBAR_WIDTH_COMPACT_PX,
  SUMMARY_SIDEBAR_WIDTH_WIDE_PX,
} from '@/page-components/vaccines/ui/vaccine-summary-sidebar/breakpoints'
import {
  SummarySidebarMediaProvider,
  useSummarySidebarMediaContext,
} from '@/page-components/vaccines/ui/vaccine-summary-sidebar/summary-sidebar-media-context'

type VaccineDetailLayoutProps = {
  sidebar: React.ReactNode
  children: React.ReactNode
}

export function VaccineDetailLayout({ sidebar, children }: VaccineDetailLayoutProps) {
  return (
    <SummarySidebarMediaProvider>
      <VaccineDetailLayoutInner sidebar={sidebar}>{children}</VaccineDetailLayoutInner>
    </SummarySidebarMediaProvider>
  )
}

function VaccineDetailLayoutInner({ sidebar, children }: VaccineDetailLayoutProps) {
  const { isDesktop, isWide } = useSummarySidebarMediaContext()
  const sidebarWidth = isWide ? SUMMARY_SIDEBAR_WIDTH_WIDE_PX : SUMMARY_SIDEBAR_WIDTH_COMPACT_PX

  if (!isDesktop) {
    return (
      <div className="flex flex-col gap-6 items-start">
        {sidebar}
        {children}
      </div>
    )
  }

  return (
    <div
      className="grid gap-6 items-start"
      style={{ gridTemplateColumns: `${sidebarWidth}px minmax(0, 1fr)` }}
    >
      {sidebar}
      {children}
    </div>
  )
}
