export type IngredientSortValue = 'name' | 'name_desc' | 'popularity'

export const INGREDIENT_SORT_OPTIONS: ReadonlyArray<{
  value: IngredientSortValue
  label: string
}> = [
  { value: 'popularity', label: 'Сначала популярные' },
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
