'use client'

import { useSyncExternalStore } from 'react'
import {
  SIDE_MENU_DESKTOP_MIN_PX,
  SIDE_MENU_TABLET_MIN_PX,
  type SideMenuMode,
} from './breakpoints'

function getMode(): SideMenuMode {
  const width = window.innerWidth
  if (width >= SIDE_MENU_DESKTOP_MIN_PX) {
    return 'desktop'
  }
  if (width >= SIDE_MENU_TABLET_MIN_PX) {
    return 'tablet'
  }
  return 'mobile'
}

function subscribe(onStoreChange: () => void) {
  const mqDesktop = window.matchMedia(`(min-width: ${SIDE_MENU_DESKTOP_MIN_PX}px)`)
  const mqTablet = window.matchMedia(`(min-width: ${SIDE_MENU_TABLET_MIN_PX}px)`)
  const onChange = () => onStoreChange()

  mqDesktop.addEventListener('change', onChange)
  mqTablet.addEventListener('change', onChange)

  return () => {
    mqDesktop.removeEventListener('change', onChange)
    mqTablet.removeEventListener('change', onChange)
  }
}

function getServerSnapshot(): SideMenuMode {
  return 'desktop'
}

export function useSideMenuMode(): SideMenuMode {
  return useSyncExternalStore(subscribe, getMode, getServerSnapshot)
}
