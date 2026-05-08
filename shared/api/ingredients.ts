import type { Ingredient, PaginatedResponse } from '@/shared/types/api'
import { MOCK_INGREDIENTS } from './mock-data'

interface IngredientsParams {
  sort?: 'popularity' | 'name'
  limit?: number
  type?: string
}

export async function fetchIngredients(params: IngredientsParams = {}): Promise<PaginatedResponse<Ingredient>> {
  await new Promise((r) => setTimeout(r, 0))

  let results = [...MOCK_INGREDIENTS]

  if (params.type) {
    results = results.filter((i) => i.type === params.type)
  }
  if (params.sort === 'popularity') {
    results.sort((a, b) => b.popularity - a.popularity)
  } else if (params.sort === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  }
  if (params.limit) {
    results = results.slice(0, params.limit)
  }

  return { count: MOCK_INGREDIENTS.length, results }
}
