'use client'

import { useSyncExternalStore } from 'react'
import { BREAKPOINT_DESKTOP_MIN_PX } from '@/shared/config/breakpoints'

const listeners = new Set<() => void>()
let desktopQuery: MediaQueryList | null = null
let snapshot = false

function readSnapshot(): boolean {
  return desktopQuery?.matches ?? false
}

function onMediaChange() {
  snapshot = readSnapshot()
  listeners.forEach((listener) => listener())
}

function attachMediaQuery() {
  if (desktopQuery) {
    return
  }

  desktopQuery = window.matchMedia(
    `(min-width: ${BREAKPOINT_DESKTOP_MIN_PX}px)`,
  )
  snapshot = readSnapshot()
  desktopQuery.addEventListener('change', onMediaChange)
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  attachMediaQuery()
  return () => listeners.delete(onStoreChange)
}

function getSnapshot(): boolean {
  attachMediaQuery()
  return snapshot
}

function getServerSnapshot(): boolean {
  return false
}

/** Viewport ≥1280px — таблица 1312px, данные 16px. */
export function useVaccineTableDesktop(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
