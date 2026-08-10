import type { PaginatedResponse, Vaccine, VaccineListItem } from '@/shared/types/api'
import { MOCK_VACCINES } from './mock-data'
import { apiFetch } from './fetch'

interface VaccinesParams {
  sort?: 'popularity' | 'name' | 'name_desc'
  q?: string
  limit?: number
  letter?: string
  infection_id?: number
  ingredient_id?: number
  contraindication_id?: number
}

export async function fetchVaccines(params: VaccinesParams = {}): Promise<PaginatedResponse<VaccineListItem>> {
  await new Promise((r) => setTimeout(r, 0)) // TODO: заменить на реальный API (PR #230)

  let results = [...MOCK_VACCINES]

  if (params.letter) {
    results = results.filter((v) => v.name.startsWith(params.letter!))
  }

  if (params.q?.trim()) {
    const q = params.q.trim().toLowerCase()
    results = results.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.infections.some((i) => i.name.toLowerCase().includes(q)),
    )
  }

  if (params.sort === 'popularity') {
    results.sort((a, b) => b.popularity - a.popularity)
  } else if (params.sort === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  } else if (params.sort === 'name_desc') {
    results.sort((a, b) => b.name.localeCompare(a.name, 'ru'))
  }

  const count = results.length

  if (params.limit) {
    results = results.slice(0, params.limit)
  }

  return { count, results }
}

export async function fetchVaccineById(id: number): Promise<Vaccine | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/vaccines/${id}/`
  try {
    return await apiFetch<Vaccine>(url)
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('404')) return null
    throw err
  }
}

export async function fetchAllVaccineIds(): Promise<number[]> {
  return [] // generateStaticParams не нужен при force-dynamic
}
