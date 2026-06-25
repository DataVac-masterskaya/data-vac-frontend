'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchBar, type SearchResultGroup } from '@datavac/ui-kit'
import { useSearchSuggestions } from '@/shared/query/hooks/use-search'
import {
  buildIngredientsPageHref,
  normalizeIngredientSort,
} from '@/page-components/ingredients/model/sort'
import {
  buildVaccinesPageHref,
  normalizeVaccineSort,
} from '@/page-components/vaccines/model/sort'
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
  const isVaccinesSearchPage = pathname === '/vaccines/search'
  const qFromUrl =
    isIngredientsPage || isVaccinesSearchPage ? (searchParams.get('q') ?? '') : ''

  const [query, setQuery] = useState(qFromUrl)

  const { data = [], isLoading } = useSearchSuggestions(query)

  const handleSubmit = (value: string) => {
    const normalizedQuery = value.trim() || undefined

    if (isVaccinesSearchPage) {
      router.push(
        buildVaccinesPageHref({
          sort: normalizeVaccineSort(searchParams.get('sort') ?? undefined),
          q: normalizedQuery,
          ingredientId: Number(searchParams.get('ingredient_id')),
          infectionId: Number(searchParams.get('infection_id')),
        }),
      )
      return
    }

    if (!isIngredientsPage) {
      router.push(buildVaccinesPageHref({ q: normalizedQuery }))
      return
    }

    router.push(
      buildIngredientsPageHref({
        type: isIngredientsPage ? (searchParams.get('type') ?? undefined) : undefined,
        sort: isIngredientsPage
          ? normalizeIngredientSort(searchParams.get('sort') ?? undefined)
          : undefined,
        q: normalizedQuery,
      }),
    )
  }

  return (
    <SearchBar
      key={
        isIngredientsPage
          ? `ingredients-${qFromUrl}`
          : isVaccinesSearchPage
            ? `vaccines-search-${qFromUrl}`
            : 'global'
      }
      placeholder="Поиск вакцины, инфекции, ингредиента..."
      defaultValue={isIngredientsPage || isVaccinesSearchPage ? qFromUrl : undefined}
      onSearch={setQuery}
      onSubmit={handleSubmit}
      results={mapSuggestionsToGroups(data)}
      isLoading={isLoading}
    />
  )
}
