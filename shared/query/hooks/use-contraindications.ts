'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchContraindications } from '@/shared/api/contraindications'
import { queryKeys } from '@/shared/query/keys'

interface ContraindicationsParams {
  category?: string
  sort?: 'popularity' | 'name'
}

export function useContraindications(params: ContraindicationsParams = {}) {
  return useQuery({
    queryKey: queryKeys.contraindications.list(params),
    queryFn: () => fetchContraindications(params),
  })
}
