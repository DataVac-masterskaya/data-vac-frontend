'use client'

import { useSyncExternalStore } from 'react'
import {
  BREAKPOINT_DESKTOP_MIN_PX,
  BREAKPOINT_SUMMARY_WIDE_MIN_PX,
} from '@/shared/config/breakpoints'

/** Совпадает с DataTable desktopBreakpoint="lg" */
export const VACCINE_TABLE_LAYOUT_DESKTOP_MIN_PX = 1024

/** Совпадает с DataTable mobile breakpoint (min-[480px] для tablet-карточек) */
export const VACCINE_TABLE_LAYOUT_TABLET_MIN_PX = 480

export type VaccineTableLayout = 'desktop' | 'tablet' | 'mobile'

export type VaccineTableMediaSnapshot = {
  layout: VaccineTableLayout
  /** Viewport ≥1280px — текст 16px, max-width 1312. */
  isWideDesktop: boolean
  /** ≥1600 → 3 иконки; иначе 2 иконки + badge. */
  routesMaxVisible: number
}

const SERVER_SNAPSHOT: VaccineTableMediaSnapshot = {
  layout: 'desktop',
  isWideDesktop: false,
  routesMaxVisible: 2,
}

const listeners = new Set<() => void>()
let desktopTableQuery: MediaQueryList | null = null
let tabletQuery: MediaQueryList | null = null
let wideDesktopQuery: MediaQueryList | null = null
let wideRoutesQuery: MediaQueryList | null = null
let snapshot: VaccineTableMediaSnapshot = SERVER_SNAPSHOT

export function getRoutesMaxVisibleFromWidth(width: number): number {
  return width >= BREAKPOINT_SUMMARY_WIDE_MIN_PX ? 3 : 2
}

function readSnapshotFromQueries(): VaccineTableMediaSnapshot {
  const isDesktopTable = desktopTableQuery!.matches
  const isTablet = tabletQuery!.matches
  const isWideDesktop = wideDesktopQuery!.matches
  const isWideRoutes = wideRoutesQuery!.matches

  const layout: VaccineTableLayout = isDesktopTable
    ? 'desktop'
    : isTablet
      ? 'tablet'
      : 'mobile'

  return {
    layout,
    isWideDesktop,
    routesMaxVisible: isWideRoutes ? 3 : 2,
  }
}

function onMediaChange() {
  snapshot = readSnapshotFromQueries()
  listeners.forEach((listener) => listener())
}

function attachMediaQueries() {
  if (desktopTableQuery) {
    return
  }

  desktopTableQuery = window.matchMedia(
    `(min-width: ${VACCINE_TABLE_LAYOUT_DESKTOP_MIN_PX}px)`,
  )
  tabletQuery = window.matchMedia(
    `(min-width: ${VACCINE_TABLE_LAYOUT_TABLET_MIN_PX}px)`,
  )
  wideDesktopQuery = window.matchMedia(
    `(min-width: ${BREAKPOINT_DESKTOP_MIN_PX}px)`,
  )
  wideRoutesQuery = window.matchMedia(
    `(min-width: ${BREAKPOINT_SUMMARY_WIDE_MIN_PX}px)`,
  )

  snapshot = readSnapshotFromQueries()

  desktopTableQuery.addEventListener('change', onMediaChange)
  tabletQuery.addEventListener('change', onMediaChange)
  wideDesktopQuery.addEventListener('change', onMediaChange)
  wideRoutesQuery.addEventListener('change', onMediaChange)
}

function detachMediaQueries() {
  if (!desktopTableQuery) {
    return
  }

  desktopTableQuery.removeEventListener('change', onMediaChange)
  tabletQuery!.removeEventListener('change', onMediaChange)
  wideDesktopQuery!.removeEventListener('change', onMediaChange)
  wideRoutesQuery!.removeEventListener('change', onMediaChange)

  desktopTableQuery = null
  tabletQuery = null
  wideDesktopQuery = null
  wideRoutesQuery = null
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

function getSnapshot(): VaccineTableMediaSnapshot {
  attachMediaQueries()
  return snapshot
}

function getServerSnapshot(): VaccineTableMediaSnapshot {
  return SERVER_SNAPSHOT
}

export function useVaccineTableMedia(): VaccineTableMediaSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function useVaccineTableLayout(): VaccineTableLayout {
  return useVaccineTableMedia().layout
}

export function useVaccineTableDesktop(): boolean {
  return useVaccineTableMedia().isWideDesktop
}

export function useRoutesMaxVisible(): number {
  return useVaccineTableMedia().routesMaxVisible
}
