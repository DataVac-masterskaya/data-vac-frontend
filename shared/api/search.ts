import type { SearchSuggestion } from '@/shared/types/api'

interface SuggestionsResponse {
  vaccines: { id: number; name: string }[]
  infections: { id: number; name: string }[]
  ingredients: { id: number; name: string }[]
  contraindications: { id: number; name: string }[]
  instructions: { id: number; name: string }[]
}

export async function fetchSearchSuggestions(
  q: string,
  signal?: AbortSignal,
): Promise<SearchSuggestion[]> {
  if (!q.trim()) return []

  const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(q.trim())}`, { signal })

  if (!res.ok) throw new Error(`${res.status}`)

  const data: SuggestionsResponse = await res.json()

  return [
    ...(data.vaccines ?? []).map((i) => ({ ...i, type: 'vaccine' as const })),
    ...(data.infections ?? []).map((i) => ({ ...i, type: 'infection' as const })),
    ...(data.contraindications ?? []).map((i) => ({ ...i, type: 'contraindication' as const })),
    ...(data.instructions ?? []).map((i) => ({ ...i, type: 'instruction' as const })),
    // ingredients temporarily hidden — backend returns full chemical composition strings
  ]
}

export type SearchSelectEntityType =
  | 'contraindication'
  | 'infection'
  | 'ingredient'
  | 'instruction'
  | 'vaccineCard'

export async function searchSelect(
  entityType: SearchSelectEntityType,
  entityId: number,
): Promise<void> {
  await fetch('/api/search/select', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ entityType, entityId }),
  })
}
