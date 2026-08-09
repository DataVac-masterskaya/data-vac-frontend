export interface Vaccine {
  id: number;
  name: string;
  infections: string[];
  administration_method: string;
  min_age_months: number | null;
  max_age_months: number | null;
  allowed_during_pregnancy: boolean;
  popularity: number;
  officialName: string | null;
  isAvailable: boolean;
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
  /** Подкатегория для группировки внутри одной карточки (например, «Хронические заболевания сердца» внутри «Хронические заболевания») */
  subcategory: string | null;
  /** Сквозные метки для фильтра (например, «Почки», «Сердце») */
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
