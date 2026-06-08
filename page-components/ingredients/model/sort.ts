import type { SortDirection } from '@datavac/ui-kit'

export type IngredientSortValue = 'name' | 'name_desc' | 'popularity'

export const POPULARITY_SORT_LABEL = 'Сначала популярные'

export const INGREDIENT_SORT_OPTIONS: ReadonlyArray<{
  value: IngredientSortValue
  label: string
}> = [
  { value: 'popularity', label: POPULARITY_SORT_LABEL },
  { value: 'name', label: 'По названию А – Я' },
  { value: 'name_desc', label: 'По названию Я – А' },
]

export function normalizeIngredientSort(sort?: string): IngredientSortValue {
  if (sort === 'name_desc') {
    return 'name_desc'
  }
  if (sort === 'popularity') {
    return 'popularity'
  }
  return 'name'
}

export function ingredientSortToTable(sort: IngredientSortValue): {
  sortField: string
  sortDirection: SortDirection
} {
  return {
    sortField: 'name',
    sortDirection: sort === 'name_desc' ? 'desc' : 'asc',
  }
}

export function buildIngredientsPageHref({
  type,
  sort,
}: {
  type?: string
  sort?: IngredientSortValue
}): string {
  const params = new URLSearchParams()
  if (type) {
    params.set('type', type)
  }
  if (sort && sort !== 'name') {
    params.set('sort', sort)
  }
  const query = params.toString()
  return query ? `/ingredients?${query}` : '/ingredients'
}
