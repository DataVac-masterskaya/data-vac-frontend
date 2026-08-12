import type { SortDirection } from '@datavac/ui-kit'

export type VaccineSortValue =
  | 'popularity'
  | 'name'
  | 'name_desc'
  | 'official_name'
  | 'official_name_desc'

export function normalizeVaccineSort(sort?: string): VaccineSortValue {
  if (sort === 'name') return 'name'
  if (sort === 'name_desc') return 'name_desc'
  if (sort === 'official_name') return 'official_name'
  if (sort === 'official_name_desc') return 'official_name_desc'
  return 'popularity'
}

export function vaccineSortToTable(sort: VaccineSortValue): {
  sortField: string | undefined
  sortDirection: SortDirection
} {
  switch (sort) {
    case 'name':
      return { sortField: 'name', sortDirection: 'asc' }
    case 'name_desc':
      return { sortField: 'name', sortDirection: 'desc' }
    case 'official_name':
      return { sortField: 'officialName', sortDirection: 'asc' }
    case 'official_name_desc':
      return { sortField: 'officialName', sortDirection: 'desc' }
    default:
      return { sortField: undefined, sortDirection: 'asc' }
  }
}

export function tableSortToVaccine(
  field: string,
  direction: SortDirection,
): VaccineSortValue {
  if (field === 'name') {
    return direction === 'desc' ? 'name_desc' : 'name'
  }
  if (field === 'officialName') {
    return direction === 'desc' ? 'official_name_desc' : 'official_name'
  }
  return 'popularity'
}

export function buildVaccinesPageHref({
  sort,
  q,
  ingredientId,
  infectionId,
  contraindicationId,
  label,
}: {
  sort?: VaccineSortValue
  q?: string
  ingredientId?: number
  infectionId?: number
  contraindicationId?: number
  label?: string
}): string {
  const params = new URLSearchParams()
  if (sort && sort !== 'popularity') {
    params.set('sort', sort)
  }
  if (q?.trim()) {
    params.set('q', q.trim())
  }
  if (infectionId) {
    params.set('infection_id', String(infectionId))
  }
  if (ingredientId) {
    params.set('ingredient_id', String(ingredientId))
  }
  if (contraindicationId) {
    params.set('contraindication_id', String(contraindicationId))
  }
  if (label?.trim()) {
    params.set('label', label.trim())
  }
  const query = params.toString()
  return query ? `/vaccines/search?${query}` : '/vaccines/search'
}
