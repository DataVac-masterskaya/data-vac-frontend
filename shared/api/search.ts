import type { SearchSuggestion } from '@/shared/types/api'
import {
  MOCK_CONTRAINDICATIONS,
  MOCK_INFECTIONS,
  MOCK_INGREDIENTS,
  MOCK_VACCINES,
} from './mock-data'

export async function fetchSearchSuggestions(q: string): Promise<SearchSuggestion[]> {
  await new Promise((r) => setTimeout(r, 0))

  if (!q.trim()) return []

  const lower = q.toLowerCase()

  const vaccines: SearchSuggestion[] = MOCK_VACCINES.filter((v) =>
    v.name.toLowerCase().includes(lower),
  ).map((v) => ({ id: v.id, name: v.name, type: 'vaccine' }))

  const infections: SearchSuggestion[] = MOCK_INFECTIONS.filter((i) =>
    i.name.toLowerCase().includes(lower),
  ).map((i) => ({ id: i.id, name: i.name, type: 'infection' }))

  const ingredients: SearchSuggestion[] = MOCK_INGREDIENTS.filter((i) =>
    i.name.toLowerCase().includes(lower),
  ).map((i) => ({ id: i.id, name: i.name, type: 'ingredient' }))

  const contraindications: SearchSuggestion[] = MOCK_CONTRAINDICATIONS.filter((c) =>
    c.name.toLowerCase().includes(lower),
  ).map((c) => ({ id: c.id, name: c.name, type: 'contraindication' }))

  return [...vaccines, ...infections, ...ingredients, ...contraindications].slice(0, 10)
}
