'use client'

import { useSyncExternalStore } from 'react'
import { SIDE_MENU_TABLET_MIN_PX } from '@/shared/ui/SideMenu/breakpoints'
import {
  SUMMARY_SIDEBAR_DESKTOP_MIN_PX,
  SUMMARY_SIDEBAR_WIDE_MIN_PX,
} from './breakpoints'

export type SummarySidebarLayout = 'mobile' | 'tablet' | 'desktop'

type SummarySidebarMediaSnapshot = {
  layout: SummarySidebarLayout
  isWide: boolean
}

const SERVER_SNAPSHOT: SummarySidebarMediaSnapshot = {
  layout: 'desktop',
  isWide: false,
}

const listeners = new Set<() => void>()
let desktopQuery: MediaQueryList | null = null
let tabletQuery: MediaQueryList | null = null
let wideQuery: MediaQueryList | null = null
let snapshot: SummarySidebarMediaSnapshot = SERVER_SNAPSHOT

function readSnapshotFromQueries(): SummarySidebarMediaSnapshot {
  const isDesktop = desktopQuery!.matches
  const isTablet = tabletQuery!.matches
  const isWide = wideQuery!.matches

  const layout: SummarySidebarLayout = isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile'

  return { layout, isWide }
}

function onMediaChange() {
  snapshot = readSnapshotFromQueries()
  listeners.forEach((listener) => listener())
}

function attachMediaQueries() {
  if (desktopQuery) {
    return
  }

  desktopQuery = window.matchMedia(`(min-width: ${SUMMARY_SIDEBAR_DESKTOP_MIN_PX}px)`)
  tabletQuery = window.matchMedia(`(min-width: ${SIDE_MENU_TABLET_MIN_PX}px)`)
  wideQuery = window.matchMedia(`(min-width: ${SUMMARY_SIDEBAR_WIDE_MIN_PX}px)`)

  snapshot = readSnapshotFromQueries()

  desktopQuery.addEventListener('change', onMediaChange)
  tabletQuery.addEventListener('change', onMediaChange)
  wideQuery.addEventListener('change', onMediaChange)
}

function detachMediaQueries() {
  if (!desktopQuery) {
    return
  }

  desktopQuery.removeEventListener('change', onMediaChange)
  tabletQuery!.removeEventListener('change', onMediaChange)
  wideQuery!.removeEventListener('change', onMediaChange)

  desktopQuery = null
  tabletQuery = null
  wideQuery = null
  snapshot = SERVER_SNAPSHOT
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  attachMediaQueries()

  return () => {
    listeners.delete(onStoreChange)
    if (listeners.size === 0) {
      detachMediaQueries()
    }
  }
}

function getSnapshot(): SummarySidebarMediaSnapshot {
  attachMediaQueries()
  return snapshot
}

function getServerSnapshot(): SummarySidebarMediaSnapshot {
  return SERVER_SNAPSHOT
}

export function useSummarySidebarMedia(): SummarySidebarMediaSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function useSummarySidebarLayout(): SummarySidebarLayout {
  return useSummarySidebarMedia().layout
}

export function useSummaryValueTextXl(): boolean {
  return useSummarySidebarMedia().isWide
}
