import type { Infection, PaginatedResponse } from '@/shared/types/api'
import { MOCK_INFECTIONS } from './mock-data'

interface InfectionsParams {
  sort?: 'popularity' | 'name'
  limit?: number
  category?: string
}

export async function fetchInfections(params: InfectionsParams = {}): Promise<PaginatedResponse<Infection>> {
  await new Promise((r) => setTimeout(r, 0))

  let results = [...MOCK_INFECTIONS]

  if (params.category) {
    results = results.filter((i) => i.category === params.category)
  }
  if (params.sort === 'popularity') {
    results.sort((a, b) => b.popularity - a.popularity)
  } else if (params.sort === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  }
  if (params.limit) {
    results = results.slice(0, params.limit)
  }

  return { count: MOCK_INFECTIONS.length, results }
}

export async function fetchInfectionById(id: number): Promise<Infection | null> {
  await new Promise((r) => setTimeout(r, 0))
  return MOCK_INFECTIONS.find((infection) => infection.id === id) ?? null
}

export async function fetchAllInfectionIds(): Promise<number[]> {
  return MOCK_INFECTIONS.map((infection) => infection.id)
}
