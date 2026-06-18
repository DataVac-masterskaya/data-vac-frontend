import type { SortDirection } from '@datavac/ui-kit'

export type IngredientSortValue =
  | 'name'
  | 'name_desc'
  | 'type'
  | 'type_desc'
  | 'popularity'

export const POPULARITY_SORT_LABEL = 'Сначала популярные'

export function normalizeIngredientSort(sort?: string): IngredientSortValue {
  if (sort === 'name_desc') return 'name_desc'
  if (sort === 'type') return 'type'
  if (sort === 'type_desc') return 'type_desc'
  if (sort === 'popularity') return 'popularity'
  return 'name'
}

export function ingredientSortToTable(sort: IngredientSortValue): {
  sortField: string
  sortDirection: SortDirection
} {
  if (sort === 'type' || sort === 'type_desc') {
    return {
      sortField: 'type',
      sortDirection: sort === 'type_desc' ? 'desc' : 'asc',
    }
  }
  if (sort === 'popularity') {
    return { sortField: 'name', sortDirection: 'asc' }
  }
  return {
    sortField: 'name',
    sortDirection: sort === 'name_desc' ? 'desc' : 'asc',
  }
}

export function tableSortToIngredient(
  field: string,
  direction: SortDirection,
): IngredientSortValue {
  if (field === 'type') {
    return direction === 'desc' ? 'type_desc' : 'type'
  }
  if (field === 'name') {
    return direction === 'desc' ? 'name_desc' : 'name'
  }
  return 'name'
}

export function buildIngredientsPageHref({
  type,
  sort,
  q,
}: {
  type?: string
  sort?: IngredientSortValue
  q?: string
}): string {
  const params = new URLSearchParams()
  if (type) {
    params.set('type', type)
  }
  if (sort && sort !== 'name') {
    params.set('sort', sort)
  }
  if (q?.trim()) {
    params.set('q', q.trim())
  }
  const query = params.toString()
  return query ? `/ingredients?${query}` : '/ingredients'
}
