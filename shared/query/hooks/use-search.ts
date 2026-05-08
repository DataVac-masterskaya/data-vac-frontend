'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchSearchSuggestions } from '@/shared/api/search'
import { queryKeys } from '@/shared/query/keys'

export function useSearchSuggestions(q: string) {
  return useQuery({
    queryKey: queryKeys.search.suggestions(q),
    queryFn: () => fetchSearchSuggestions(q),
    enabled: q.trim().length > 1,
    staleTime: 30_000,
  })
}
