export interface VaccineInfection {
  id: number
  name: string
}

export interface VaccineListItem {
  id: number
  name: string
  official_name: string | null
  is_available_in_rf: boolean
  popularity: number
  infections: VaccineInfection[]
  administration_method: string
  min_age_months: number | null
  max_age_months: number | null
  allowed_during_pregnancy: boolean
}

export interface Vaccine {
  id: number
  name: string
  official_name: string | null
  is_available_in_rf: boolean
  popularity: number
  infections: VaccineInfection[]
  revision_date: string | null
  nonspec_url: string | null
  instruction_url: string | null
  age_allowed: string | null
  pregnancy_usage_status: boolean
  administration_methods: { code: string | null; age_group: string | null; note: string | null }[]
  contraindications: { id: number; name: string; type: string }[]
  ingredients: { id: number; name: string; role: string }[]
  comment: { source: string | null; text: string | null } | null
  manufacturer: string | null
  storage_conditions: string | null
  schedule_info: string | null
  side_effects: string | null
  indications: string | null
  interaction_info: string | null
  compatibility_info: string | null
}

export interface Infection {
  id: number;
  name: string;
  category: 'national_calendar' | 'extended' | 'other';
  popularity: number;
}

export interface Ingredient {
  id: number;
  name: string;
  type: string;
  popularity: number;
}

export interface ContraindicationCategory {
  id: number;
  name: string;
}

export interface Contraindication {
  id: number;
  name: string;
  category: ContraindicationCategory | null;
  subcategory: string | null;
  tags?: string[];
  popularity: number;
}

export interface SearchSuggestion {
  id: number;
  name: string;
  type: 'vaccine' | 'infection' | 'ingredient' | 'contraindication';
}

export interface PaginatedResponse<T> {
  count: number;
  results: T[];
}
