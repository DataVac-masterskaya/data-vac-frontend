import { create } from 'zustand'
import type { SearchSuggestion } from '@/shared/types/api'

interface SearchState {
  query: string
  isOpen: boolean
  suggestions: SearchSuggestion[]

  setQuery: (query: string) => void
  setSuggestions: (suggestions: SearchSuggestion[]) => void
  open: () => void
  close: () => void
  reset: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  isOpen: false,
  suggestions: [],

  setQuery: (query) => set({ query }),
  setSuggestions: (suggestions) => set({ suggestions }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, query: '', suggestions: [] }),
  reset: () => set({ query: '', suggestions: [] }),
}))
