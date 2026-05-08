'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchIngredients } from '@/shared/api/ingredients'
import { queryKeys } from '@/shared/query/keys'

interface IngredientsParams {
  type?: string
  sort?: 'popularity' | 'name'
}

export function useIngredients(params: IngredientsParams = {}) {
  return useQuery({
    queryKey: queryKeys.ingredients.list(params),
    queryFn: () => fetchIngredients(params),
  })
}
