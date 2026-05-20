'use client'

import { useEffect, useState } from 'react'
import { SideMenu } from './side-menu'

type ResponsiveSideMenuSlotProps = {
  slot: 'desktop' | 'tablet'
}

function getViewportWidth() {
  if (typeof window === 'undefined') {
    return 1280
  }
  return window.innerWidth
}

export function ResponsiveSideMenuSlot({ slot }: ResponsiveSideMenuSlotProps) {
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth)

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isDesktop = viewportWidth >= 1280
  const isTablet = viewportWidth >= 768 && viewportWidth < 1280

  if (slot === 'desktop') {
    if (!isDesktop) {
      return null
    }

    return (
      <>
        <SideMenu mode="desktop" />
        <div className="w-[216px] shrink-0" aria-hidden />
      </>
    )
  }

  return isTablet ? <SideMenu mode="tablet" /> : null
}
