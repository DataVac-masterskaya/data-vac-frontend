'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchBar, type SearchResultGroup, type SearchResultItem } from '@datavac/ui-kit'
import { useSearchSuggestions } from '@/shared/lib/hooks/use-search-suggestions'
import {
  buildIngredientsPageHref,
  normalizeIngredientSort,
} from '@/page-components/ingredients/model/sort'
import {
  buildVaccinesPageHref,
  normalizeVaccineSort,
} from '@/page-components/vaccines/model/sort'
import type { SearchSuggestion } from '@/shared/types/api'
import { searchSelect, type SearchSelectEntityType } from '@/shared/api/search'

const GROUP_LABELS: Record<SearchSuggestion['type'], string> = {
  vaccine: 'Вакцины',
  infection: 'Инфекции',
  ingredient: 'Ингредиенты',
  contraindication: 'Противопоказания',
  instruction: 'Инструкции',
}

// API entityType values differ from frontend type names
const API_ENTITY_TYPE: Record<SearchSuggestion['type'], SearchSelectEntityType> = {
  vaccine: 'vaccineCard',
  infection: 'infection',
  ingredient: 'ingredient',
  contraindication: 'contraindication',
  instruction: 'instruction',
}

function mapSuggestionsToGroups(
  suggestions: SearchSuggestion[],
): SearchResultGroup[] {
  const groups = new Map<string, SearchResultGroup['items']>()

  for (const item of suggestions) {
    const category = GROUP_LABELS[item.type]
    const items = groups.get(category) ?? []
    // encode type into id so it can be decoded in onSelect
    items.push({ id: `${item.type}:${item.id}`, label: item.name })
    groups.set(category, items)
  }

  return Array.from(groups.entries()).map(([category, items]) => ({
    category,
    items,
  }))
}

export function AppSearchBar({ forceClose }: { forceClose?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const isIngredientsPage = pathname === '/ingredients'
  const isVaccinesSearchPage = pathname === '/vaccines/search'

  const hasEntityFilter =
    isVaccinesSearchPage &&
    !!(
      searchParams.get('infection_id') ||
      searchParams.get('ingredient_id') ||
      searchParams.get('contraindication_id')
    )

  const displayValue = hasEntityFilter
    ? (searchParams.get('label') ?? '')
    : (isIngredientsPage || isVaccinesSearchPage ? (searchParams.get('q') ?? '') : '')

  // При entity-фильтре query пустой — чтобы не стрелять автодополнение по лейблу
  const [query, setQuery] = useState(hasEntityFilter ? '' : displayValue)

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

  const handleSelect = (item: SearchResultItem) => {
    const colonIdx = item.id.indexOf(':')
    const type = item.id.slice(0, colonIdx) as SearchSuggestion['type']
    const entityId = Number(item.id.slice(colonIdx + 1))
    const entityType = API_ENTITY_TYPE[type]

    if (entityType && entityId) {
      searchSelect(entityType, entityId).catch(() => {})
    }

    switch (type) {
      case 'vaccine':
        router.push(`/vaccines/${entityId}`)
        break
      case 'infection':
        router.push(buildVaccinesPageHref({ infectionId: entityId, label: item.label }))
        break
      case 'ingredient':
        router.push(buildVaccinesPageHref({ ingredientId: entityId, label: item.label }))
        break
      case 'contraindication':
        router.push(buildVaccinesPageHref({ contraindicationId: entityId, label: item.label }))
        break
      case 'instruction':
        router.push(buildVaccinesPageHref({ q: item.label }))
        break
    }
  }

  return (
    <SearchBar
      key={
        isIngredientsPage
          ? `ingredients-${displayValue}`
          : isVaccinesSearchPage
            ? `vaccines-search-${displayValue}`
            : 'global'
      }
      placeholder="Поиск вакцины, инфекции, ингредиента..."
      defaultValue={isIngredientsPage || isVaccinesSearchPage ? displayValue : undefined}
      onSearch={setQuery}
      onSubmit={handleSubmit}
      onSelect={handleSelect}
      results={mapSuggestionsToGroups(data)}
      isLoading={isLoading}
      forceClose={forceClose}
    />
  )
}
