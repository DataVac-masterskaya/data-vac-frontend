import type { PaginatedResponse, Vaccine } from '@/shared/types/api'
import { MOCK_VACCINES } from './mock-data'

interface VaccinesParams {
  sort?: 'popularity' | 'name' | 'name_desc'
  q?: string
  limit?: number
  letter?: string
  infection_id?: number
  ingredient_id?: number
  contraindication_id?: number
}

export async function fetchVaccines(params: VaccinesParams = {}): Promise<PaginatedResponse<Vaccine>> {
  await new Promise((r) => setTimeout(r, 0)) // симуляция async

  let results = [...MOCK_VACCINES]

  if (params.letter) {
    results = results.filter((v) => v.name.startsWith(params.letter!))
  }

  if (params.q?.trim()) {
    const q = params.q.trim().toLowerCase()
    results = results.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.administration_method.toLowerCase().includes(q) ||
        v.infections.some((infection) => infection.toLowerCase().includes(q)),
    )
  }
  if (params.infection_id) {
    const infection = results.find((_, i) => i === params.infection_id! - 1)
    results = infection ? [infection] : []
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
  const response = await fetch(url, { next: { revalidate: 3600 } })

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }
    throw new Error(`Не удалось получить данные о вакцине (${response.status})`)
  }

  const data = await response.json()

  return data
}

export async function fetchAllVaccineIds(): Promise<number[]> {
  return MOCK_VACCINES.map((v) => v.id)
}
