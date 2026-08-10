import type { Ingredient, PaginatedResponse } from '@/shared/types/api'
import { apiFetch } from './fetch'

interface IngredientsParams {
  sort?: 'popularity' | 'name' | 'name_desc' | 'type' | 'type_desc'
  limit?: number
  type?: string
  q?: string
}

const SORT_TO_ORDERING: Record<NonNullable<IngredientsParams['sort']>, string> = {
  popularity: 'popularity',
  name: 'name',
  name_desc: '-name',
  type: 'type',
  type_desc: '-type',
}

export async function fetchIngredients(params: IngredientsParams = {}): Promise<PaginatedResponse<Ingredient>> {
  const searchParams = new URLSearchParams()

  if (params.q?.trim()) searchParams.set('search', params.q.trim())
  if (params.type) searchParams.set('type', params.type)
  if (params.sort) searchParams.set('ordering', SORT_TO_ORDERING[params.sort])
  if (params.limit) searchParams.set('limit', String(params.limit))

  const query = searchParams.toString()
  const url = `${process.env.NEXT_PUBLIC_API_URL}/ingredients/${query ? `?${query}` : ''}`

  return apiFetch<PaginatedResponse<Ingredient>>(url, { next: { revalidate: 3600 } })
}
