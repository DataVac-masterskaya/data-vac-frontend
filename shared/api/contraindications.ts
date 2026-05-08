import type { Contraindication, PaginatedResponse } from '@/shared/types/api'
import { MOCK_CONTRAINDICATIONS } from './mock-data'

interface ContraindicationsParams {
  sort?: 'popularity' | 'name'
  limit?: number
  category?: string
}

export async function fetchContraindications(params: ContraindicationsParams = {}): Promise<PaginatedResponse<Contraindication>> {
  await new Promise((r) => setTimeout(r, 0))

  let results = [...MOCK_CONTRAINDICATIONS]

  if (params.category) {
    results = results.filter((c) => c.category === params.category)
  }
  if (params.sort === 'popularity') {
    results.sort((a, b) => b.popularity - a.popularity)
  } else if (params.sort === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  }
  if (params.limit) {
    results = results.slice(0, params.limit)
  }

  return { count: MOCK_CONTRAINDICATIONS.length, results }
}
