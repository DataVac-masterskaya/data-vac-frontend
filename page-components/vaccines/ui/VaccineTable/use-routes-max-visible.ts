'use client'

import { useSyncExternalStore } from 'react'
import {
  BREAKPOINT_DESKTOP_MIN_PX,
  BREAKPOINT_SUMMARY_WIDE_MIN_PX,
} from '@/shared/config/breakpoints'

export function getRoutesMaxVisibleFromWidth(width: number): number {
  if (width >= BREAKPOINT_SUMMARY_WIDE_MIN_PX) return 3
  if (width >= BREAKPOINT_DESKTOP_MIN_PX) return 2
  return 3
}

const listeners = new Set<() => void>()
let desktopQuery: MediaQueryList | null = null
let wideQuery: MediaQueryList | null = null
let snapshot = 3

function readSnapshot(): number {
  return getRoutesMaxVisibleFromWidth(window.innerWidth)
}

function onMediaChange() {
  snapshot = readSnapshot()
  listeners.forEach((listener) => listener())
}

function attachMediaQueries() {
  if (desktopQuery) return

  desktopQuery = window.matchMedia(
    `(min-width: ${BREAKPOINT_DESKTOP_MIN_PX}px)`,
  )
  wideQuery = window.matchMedia(
    `(min-width: ${BREAKPOINT_SUMMARY_WIDE_MIN_PX}px)`,
  )
  snapshot = readSnapshot()
  desktopQuery.addEventListener('change', onMediaChange)
  wideQuery.addEventListener('change', onMediaChange)
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  attachMediaQueries()
  return () => listeners.delete(onStoreChange)
}

function getSnapshot(): number {
  attachMediaQueries()
  return snapshot
}

function getServerSnapshot(): number {
  return 3
}

/** Figma: ≥1600 и <1280 → 3 иконки; 1280–1599 → 2 иконки. */
export function useRoutesMaxVisible(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
