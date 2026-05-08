'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchVaccineById, fetchVaccines } from '@/shared/api/vaccines'
import { queryKeys } from '@/shared/query/keys'

interface VaccinesParams {
  letter?: string
  sort?: 'popularity' | 'name'
  infection_id?: number
}

export function useVaccines(params: VaccinesParams = {}) {
  return useQuery({
    queryKey: queryKeys.vaccines.list(params),
    queryFn: () => fetchVaccines(params),
  })
}

export function useVaccine(id: number) {
  return useQuery({
    queryKey: queryKeys.vaccines.detail(id),
    queryFn: () => fetchVaccineById(id),
    enabled: !!id,
  })
}
