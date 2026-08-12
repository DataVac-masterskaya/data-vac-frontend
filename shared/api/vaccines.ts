import type { PaginatedResponse, Vaccine, VaccineListItem } from '@/shared/types/api'
import { apiFetch, ApiError } from './fetch'

interface VaccinesParams {
  sort?: 'popularity' | 'name' | 'name_desc' | 'official_name' | 'official_name_desc'
  q?: string
  limit?: number
  offset?: number
  letter?: string
  infection_id?: number
  ingredient_id?: number
  contraindication_id?: number
}

const SORT_TO_ORDERING: Record<NonNullable<VaccinesParams['sort']>, string | undefined> = {
  popularity: undefined, // default backend order, no param needed
  name: 'current_version__name',
  name_desc: '-current_version__name',
  official_name: 'current_version__official_name',
  official_name_desc: '-current_version__official_name',
}

export async function fetchVaccines(params: VaccinesParams = {}): Promise<PaginatedResponse<VaccineListItem>> {
  const searchParams = new URLSearchParams()

  if (params.q?.trim()) searchParams.set('search', params.q.trim())
  const ordering = params.sort ? SORT_TO_ORDERING[params.sort] : undefined
  if (ordering) searchParams.set('ordering', ordering)
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.offset) searchParams.set('offset', String(params.offset))
  if (params.letter) searchParams.set('first_letter', params.letter)
  if (params.infection_id) {
    searchParams.set('filter_type', 'infection')
    searchParams.set('filter_id', String(params.infection_id))
  } else if (params.ingredient_id) {
    searchParams.set('filter_type', 'ingredient')
    searchParams.set('filter_id', String(params.ingredient_id))
  } else if (params.contraindication_id) {
    searchParams.set('filter_type', 'contraindication')
    searchParams.set('filter_id', String(params.contraindication_id))
  }

  const query = searchParams.toString()
  const url = `${process.env.NEXT_PUBLIC_API_URL}/vaccines/${query ? `?${query}` : ''}`

  return apiFetch<PaginatedResponse<VaccineListItem>>(url)
}

export async function fetchVaccineById(id: number): Promise<Vaccine | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/vaccines/${id}/`
  try {
    return await apiFetch<Vaccine>(url)
  } catch (err: unknown) {
    if (err instanceof ApiError && err.status === 404) return null
    throw err
  }
}

export async function fetchAllVaccineIds(): Promise<number[]> {
  return [] // generateStaticParams не нужен при force-dynamic
}
