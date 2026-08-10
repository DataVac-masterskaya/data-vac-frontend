'use client'

import { useState, useEffect } from 'react'
import { fetchSearchSuggestions } from '@/shared/api/search'
import type { SearchSuggestion } from '@/shared/types/api'

const DEBOUNCE_MS = 300

export function useSearchSuggestions(q: string) {
  const [data, setData] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (q.trim().length <= 1) {
      setData([])
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    const timer = setTimeout(() => {
      setIsLoading(true)

      fetchSearchSuggestions(q, controller.signal)
        .then((results) => {
          if (!controller.signal.aborted) setData(results)
        })
        .catch(() => {
          if (!controller.signal.aborted) setData([])
        })
        .finally(() => {
          if (!controller.signal.aborted) setIsLoading(false)
        })
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [q])

  return { data, isLoading }
}
