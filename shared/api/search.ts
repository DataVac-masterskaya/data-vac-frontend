import type { SearchSuggestion } from '@/shared/types/api'
import { MOCK_INFECTIONS } from './mock-data'
import { fetchVaccines } from './vaccines'
import { fetchContraindications } from './contraindications'
import { fetchIngredients } from './ingredients'

export async function fetchSearchSuggestions(q: string): Promise<SearchSuggestion[]> {
  if (!q.trim()) return []

  const lower = q.toLowerCase()

  const [vaccineRes, contraindicationRes, ingredientRes] = await Promise.all([
    fetchVaccines({ q, limit: 5 }).catch(() => ({ results: [], count: 0 })),
    fetchContraindications().catch(() => []),
    fetchIngredients({ q, limit: 5 }).catch(() => ({ results: [], count: 0 })),
  ])

  const vaccines: SearchSuggestion[] = vaccineRes.results.map((v) => ({
    id: v.id, name: v.name, type: 'vaccine',
  }))

  const contraindications: SearchSuggestion[] = contraindicationRes
    .filter((c) => c.name.toLowerCase().includes(lower))
    .map((c) => ({ id: c.id, name: c.name, type: 'contraindication' }))

  const infections: SearchSuggestion[] = MOCK_INFECTIONS
    .filter((i) => i.name.toLowerCase().includes(lower))
    .map((i) => ({ id: i.id, name: i.name, type: 'infection' }))

  const ingredients: SearchSuggestion[] = ingredientRes.results
    .map((i) => ({ id: i.id, name: i.name, type: 'ingredient' as const }))

  return [...vaccines, ...infections, ...ingredients, ...contraindications].slice(0, 10)
}
