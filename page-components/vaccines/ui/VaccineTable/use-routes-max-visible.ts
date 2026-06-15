'use client'

import { useSyncExternalStore } from 'react'
import { BREAKPOINT_SUMMARY_WIDE_MIN_PX } from '@/shared/config/breakpoints'

export function getRoutesMaxVisibleFromWidth(width: number): number {
  if (width >= BREAKPOINT_SUMMARY_WIDE_MIN_PX) return 3
  return 2
}

const listeners = new Set<() => void>()
let wideQuery: MediaQueryList | null = null
let snapshot = 3

function readSnapshot(): number {
  return getRoutesMaxVisibleFromWidth(window.innerWidth)
}

function onMediaChange() {
  snapshot = readSnapshot()
  listeners.forEach((listener) => listener())
}

function attachMediaQuery() {
  if (wideQuery) {
    return
  }

  wideQuery = window.matchMedia(
    `(min-width: ${BREAKPOINT_SUMMARY_WIDE_MIN_PX}px)`,
  )
  snapshot = readSnapshot()
  wideQuery.addEventListener('change', onMediaChange)
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  attachMediaQuery()
  return () => listeners.delete(onStoreChange)
}

function getSnapshot(): number {
  attachMediaQuery()
  return snapshot
}

function getServerSnapshot(): number {
  return 3
}

/** ≥1600 → 3 иконки; иначе 2 иконки + badge (desktop и card). */
export function useRoutesMaxVisible(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
