'use client'

import { SideMenuNav } from '@/shared/ui/SideMenu/side-menu-nav'
import { SideMenuSupportButton } from '@/shared/ui/SideMenu/side-menu-support-button'
import { useIsPortrait } from '@/shared/ui/SideMenu/use-orientation'

export function HeaderNavRow() {
  const isPortrait = useIsPortrait()

  return (
    <div className="flex h-16 min-w-0 items-center justify-between gap-3 overflow-hidden">
      <SideMenuNav showLabels={!isPortrait} orientation="horizontal" />
      <SideMenuSupportButton variant="tablet" />
    </div>
  )
}
