'use client'

import { useSyncExternalStore } from 'react'

export type PageOrientation = 'portrait' | 'landscape'

function getOrientation(): PageOrientation {
  return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape'
}

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia('(orientation: portrait)')
  const onChange = () => onStoreChange()

  mq.addEventListener('change', onChange)

  return () => mq.removeEventListener('change', onChange)
}

function getServerSnapshot(): PageOrientation {
  return 'landscape'
}

export function usePageOrientation(): PageOrientation {
  return useSyncExternalStore(subscribe, getOrientation, getServerSnapshot)
}

export function useIsPortrait(): boolean {
  return usePageOrientation() === 'portrait'
}
