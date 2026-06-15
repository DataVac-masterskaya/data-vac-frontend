'use client'

import { useSyncExternalStore } from 'react'

/** Совпадает с DataTable desktopBreakpoint="lg" */
export const VACCINE_TABLE_LAYOUT_DESKTOP_MIN_PX = 1024

/** Совпадает с DataTable mobile breakpoint (min-[480px] для tablet-карточек) */
export const VACCINE_TABLE_LAYOUT_TABLET_MIN_PX = 480

export type VaccineTableLayout = 'desktop' | 'tablet' | 'mobile'

const listeners = new Set<() => void>()
let desktopQuery: MediaQueryList | null = null
let tabletQuery: MediaQueryList | null = null
let snapshot: VaccineTableLayout = 'mobile'

function readSnapshot(): VaccineTableLayout {
  if (desktopQuery?.matches) {
    return 'desktop'
  }

  if (tabletQuery?.matches) {
    return 'tablet'
  }

  return 'mobile'
}

function onMediaChange() {
  snapshot = readSnapshot()
  listeners.forEach((listener) => listener())
}

function attachMediaQueries() {
  if (desktopQuery) {
    return
  }

  desktopQuery = window.matchMedia(
    `(min-width: ${VACCINE_TABLE_LAYOUT_DESKTOP_MIN_PX}px)`,
  )
  tabletQuery = window.matchMedia(
    `(min-width: ${VACCINE_TABLE_LAYOUT_TABLET_MIN_PX}px)`,
  )
  snapshot = readSnapshot()
  desktopQuery.addEventListener('change', onMediaChange)
  tabletQuery.addEventListener('change', onMediaChange)
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  attachMediaQueries()
  return () => listeners.delete(onStoreChange)
}

function getSnapshot(): VaccineTableLayout {
  attachMediaQueries()
  return snapshot
}

function getServerSnapshot(): VaccineTableLayout {
  return 'desktop'
}

export function useVaccineTableLayout(): VaccineTableLayout {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
