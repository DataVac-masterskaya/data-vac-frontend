import type { Infection, PaginatedResponse } from '@/shared/types/api'

interface InfectionsParams {
  sort?: 'popularity' | 'name_asc' | 'name_desc'
  limit?: number
  offset?: number
  category?: string
}

// API values → frontend values
const API_TO_FRONTEND_CATEGORY: Record<string, Infection['category']> = {
  national: 'national_calendar',
  additional: 'extended',
  others: 'other',
}

// Frontend values → API values
const FRONTEND_TO_API_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(API_TO_FRONTEND_CATEGORY).map(([apiVal, frontendVal]) => [frontendVal, apiVal])
)

const SORT_MAP: Record<NonNullable<InfectionsParams['sort']>, string> = {
  popularity: '-popularity',
  name_asc: 'name',
  name_desc: '-name',
}

export async function fetchInfections(params: InfectionsParams = {}): Promise<PaginatedResponse<Infection>> {
  const searchParams = new URLSearchParams()

  if (params.sort) searchParams.set('sort_by', SORT_MAP[params.sort])
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.offset) searchParams.set('offset', String(params.offset))
  if (params.category) searchParams.set('category', FRONTEND_TO_API_CATEGORY[params.category] ?? params.category)

  const query = searchParams.toString()
  const url = `${process.env.NEXT_PUBLIC_API_URL}/infections/${query ? `?${query}` : ''}`

  const res = await fetch(url, { next: { revalidate: 3600 } })

  if (!res.ok) {
    throw new Error(`Не удалось получить данные (${res.status})`)
  }

  const data = await res.json() as PaginatedResponse<Infection>

  return {
    ...data,
    results: data.results.map((item) => ({
      ...item,
      category: API_TO_FRONTEND_CATEGORY[item.category] || item.category,
    })),
  }
}

export async function fetchInfectionById(id: number): Promise<Infection | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/infections/${id}/`

  const res = await fetch(url, { next: { revalidate: 3600 } })

  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error(`Не удалось получить данные (${res.status})`)
  }

  const data = await res.json() as Infection

  return {
    ...data,
    category: API_TO_FRONTEND_CATEGORY[data.category] || data.category,
  }
}

export async function fetchAllInfectionIds(): Promise<number[]> {
  return [] // generateStaticParams не нужен при force-dynamic
}