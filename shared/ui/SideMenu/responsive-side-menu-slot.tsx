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
    return isDesktop ? <SideMenu mode="desktop" /> : null
  }

  return isTablet ? <SideMenu mode="tablet" /> : null
}
