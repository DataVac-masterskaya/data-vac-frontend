export interface Vaccine {
  id: number
  name: string
  infections: string[]
  administration_method: string
  min_age_months: number | null
  max_age_months: number | null
  allowed_during_pregnancy: boolean
  popularity: number
}

export interface Infection {
  id: number
  name: string
  category: 'national_calendar' | 'extended' | 'other'
  popularity: number
}

export interface Ingredient {
  id: number
  name: string
  type: string
  popularity: number
}

export interface Contraindication {
  id: number
  name: string
  category: string
  popularity: number
}

export interface SearchSuggestion {
  id: number
  name: string
  type: 'vaccine' | 'infection' | 'ingredient' | 'contraindication'
}

export interface PaginatedResponse<T> {
  count: number
  results: T[]
}
