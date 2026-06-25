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
}: {
  sort?: VaccineSortValue
}): string {
  const params = new URLSearchParams()
  if (sort && sort !== 'popularity') {
    params.set('sort', sort)
  }
  const query = params.toString()
  return query ? `/vaccines?${query}` : '/vaccines'
}
