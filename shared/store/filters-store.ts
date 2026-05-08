import { create } from 'zustand'

interface VaccineFilters {
  letter: string | undefined
  sort: 'popularity' | 'name'
}

interface InfectionFilters {
  category: string | undefined
}

interface IngredientFilters {
  type: string | undefined
}

interface ContraindicationFilters {
  category: string | undefined
}

interface FiltersState {
  vaccines: VaccineFilters
  infections: InfectionFilters
  ingredients: IngredientFilters
  contraindications: ContraindicationFilters

  setVaccineFilters: (filters: Partial<VaccineFilters>) => void
  setInfectionFilters: (filters: Partial<InfectionFilters>) => void
  setIngredientFilters: (filters: Partial<IngredientFilters>) => void
  setContraindicationFilters: (filters: Partial<ContraindicationFilters>) => void
  resetFilters: () => void
}

const defaultFilters = {
  vaccines: { letter: undefined, sort: 'popularity' as const },
  infections: { category: undefined },
  ingredients: { type: undefined },
  contraindications: { category: undefined },
}

export const useFiltersStore = create<FiltersState>((set) => ({
  ...defaultFilters,

  setVaccineFilters: (filters) =>
    set((state) => ({ vaccines: { ...state.vaccines, ...filters } })),

  setInfectionFilters: (filters) =>
    set((state) => ({ infections: { ...state.infections, ...filters } })),

  setIngredientFilters: (filters) =>
    set((state) => ({ ingredients: { ...state.ingredients, ...filters } })),

  setContraindicationFilters: (filters) =>
    set((state) => ({ contraindications: { ...state.contraindications, ...filters } })),

  resetFilters: () => set(defaultFilters),
}))
