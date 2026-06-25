import type { SortDirection } from '@datavac/ui-kit'

export type VaccineSortValue = 'popularity' | 'name' | 'name_desc'

export function normalizeVaccineSort(sort?: string): VaccineSortValue {
  if (sort === 'name') return 'name'
  if (sort === 'name_desc') return 'name_desc'
  if (sort === 'popularity') return 'popularity'
  return 'popularity'
}

export function vaccineSortToTable(sort: VaccineSortValue): {
  sortField: string | undefined
  sortDirection: SortDirection
} {
  if (sort === 'popularity') {
    return { sortField: undefined, sortDirection: 'asc' }
  }
  return {
    sortField: 'name',
    sortDirection: sort === 'name_desc' ? 'desc' : 'asc',
  }
}

export function tableSortToVaccine(
  field: string,
  direction: SortDirection,
): VaccineSortValue {
  if (field === 'name') {
    return direction === 'desc' ? 'name_desc' : 'name'
  }
  return 'popularity'
}

export function buildVaccinesPageHref({
  sort,
  q,
  ingredientId,
  infectionId,
}: {
  sort?: VaccineSortValue
  q?: string
  ingredientId?: number
  infectionId?: number
}): string {
  const params = new URLSearchParams()
  if (sort && sort !== 'popularity') {
    params.set('sort', sort)
  }
  if (q?.trim()) {
    params.set('q', q.trim())
  }
  if (Number.isFinite(ingredientId)) {
    params.set('ingredient_id', String(ingredientId))
  }
  if (Number.isFinite(infectionId)) {
    params.set('infection_id', String(infectionId))
  }
  const query = params.toString()
  return query ? `/vaccines/search?${query}` : '/vaccines/search'
}
