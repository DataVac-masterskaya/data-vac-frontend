import type { Ingredient, PaginatedResponse } from '@/shared/types/api'
import { MOCK_INGREDIENTS } from './mock-data'

interface IngredientsParams {
  sort?: 'popularity' | 'name' | 'name_desc' | 'type' | 'type_desc'
  limit?: number
  type?: string
  q?: string 
}

export async function fetchIngredients(params: IngredientsParams = {}): Promise<PaginatedResponse<Ingredient>> {
  await new Promise((r) => setTimeout(r, 0))

  let results = [...MOCK_INGREDIENTS]

  if (params.type) {
    results = results.filter((i) => i.type === params.type)
  }
  if (params.q?.trim()) {
    const lower = params.q.trim().toLowerCase()
    results = results.filter((i) => i.name.toLowerCase().includes(lower))
  }
  if (params.sort === 'popularity') {
    results.sort((a, b) => b.popularity - a.popularity)
  } else if (params.sort === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  } else if (params.sort === 'name_desc') {
    results.sort((a, b) => b.name.localeCompare(a.name, 'ru'))
  } else if (params.sort === 'type') {
    results.sort((a, b) => a.type.localeCompare(b.type, 'ru'))
  } else if (params.sort === 'type_desc') {
    results.sort((a, b) => b.type.localeCompare(a.type, 'ru'))
  }
  if (params.limit) {
    results = results.slice(0, params.limit)
  }

  return { count: MOCK_INGREDIENTS.length, results }
}
