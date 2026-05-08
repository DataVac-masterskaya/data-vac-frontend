export const queryKeys = {
  vaccines: {
    all: ['vaccines'] as const,
    list: (params: { letter?: string; sort?: string; infection_id?: number }) =>
      ['vaccines', 'list', params] as const,
    detail: (id: number) => ['vaccines', 'detail', id] as const,
  },
  infections: {
    all: ['infections'] as const,
    list: (params: { category?: string; sort?: string }) =>
      ['infections', 'list', params] as const,
  },
  ingredients: {
    all: ['ingredients'] as const,
    list: (params: { type?: string; sort?: string }) =>
      ['ingredients', 'list', params] as const,
  },
  contraindications: {
    all: ['contraindications'] as const,
    list: (params: { category?: string; sort?: string }) =>
      ['contraindications', 'list', params] as const,
  },
  search: {
    suggestions: (q: string) => ['search', 'suggestions', q] as const,
  },
}
