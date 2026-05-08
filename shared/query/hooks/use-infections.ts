'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchInfections } from '@/shared/api/infections'
import { queryKeys } from '@/shared/query/keys'

interface InfectionsParams {
  category?: string
  sort?: 'popularity' | 'name'
}

export function useInfections(params: InfectionsParams = {}) {
  return useQuery({
    queryKey: queryKeys.infections.list(params),
    queryFn: () => fetchInfections(params),
  })
}
