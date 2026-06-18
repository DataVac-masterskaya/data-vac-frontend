'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchBar, type SearchResultGroup } from '@datavac/ui-kit'
import { useSearchSuggestions } from '@/shared/query/hooks/use-search'
import {
  buildIngredientsPageHref,
  normalizeIngredientSort,
} from '@/page-components/ingredients/model/sort'
import type { SearchSuggestion } from '@/shared/types/api'

const GROUP_LABELS: Record<SearchSuggestion['type'], string> = {
  vaccine: 'Вакцины',
  infection: 'Инфекции',
  ingredient: 'Ингредиенты',
  contraindication: 'Противопоказания',
}

function mapSuggestionsToGroups(
  suggestions: SearchSuggestion[],
): SearchResultGroup[] {
  const groups = new Map<string, SearchResultGroup['items']>()

  for (const item of suggestions) {
    const category = GROUP_LABELS[item.type]
    const items = groups.get(category) ?? []
    items.push({ id: String(item.id), label: item.name })
    groups.set(category, items)
  }

  return Array.from(groups.entries()).map(([category, items]) => ({
    category,
    items,
  }))
}

export function AppSearchBar() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const isIngredientsPage = pathname === '/ingredients'
  const qFromUrl = isIngredientsPage ? (searchParams.get('q') ?? '') : ''

  const [query, setQuery] = useState(qFromUrl)

  const { data = [], isLoading } = useSearchSuggestions(query)

  const handleSubmit = (value: string) => {
    router.push(
      buildIngredientsPageHref({
        type: isIngredientsPage ? (searchParams.get('type') ?? undefined) : undefined,
        sort: isIngredientsPage
          ? normalizeIngredientSort(searchParams.get('sort') ?? undefined)
          : undefined,
        q: value.trim() || undefined,
      }),
    )
  }

  return (
    <SearchBar
      key={isIngredientsPage ? `ingredients-${qFromUrl}` : 'global'}
      placeholder="Поиск вакцины, инфекции, ингредиента..."
      defaultValue={isIngredientsPage ? qFromUrl : undefined}
      onSearch={setQuery}
      onSubmit={handleSubmit}
      results={mapSuggestionsToGroups(data)}
      isLoading={isLoading}
    />
  )
}
