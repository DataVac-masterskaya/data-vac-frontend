'use client'

import { useState, useEffect } from 'react'
import { fetchSearchSuggestions } from '@/shared/api/search'
import type { SearchSuggestion } from '@/shared/types/api'

export function useSearchSuggestions(q: string) {
  const [data, setData] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (q.trim().length <= 1) {
      setData([])
      return
    }

    const controller = new AbortController()
    setIsLoading(true)

    fetchSearchSuggestions(q)
      .then((results) => {
        if (!controller.signal.aborted) setData(results)
      })
      .catch(() => {
        if (!controller.signal.aborted) setData([])
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [q])

  return { data, isLoading }
}
