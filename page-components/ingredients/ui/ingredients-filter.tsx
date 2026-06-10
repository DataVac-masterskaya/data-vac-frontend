'use client'

import { TagFilter } from '@datavac/ui-kit'
import { useRouter } from 'next/navigation'
import type { IngredientSortValue } from '../model/sort'
import { buildIngredientsPageHref } from '../model/sort'
import { INGREDIENT_FILTER_TAGS } from '../model/filter-tags'

type Props = {
  activeType?: string
  sort: IngredientSortValue
  q?: string
}

export function IngredientsFilter({ activeType, sort, q }: Props) {
  const router = useRouter()

  const active =
    activeType && INGREDIENT_FILTER_TAGS.includes(activeType as (typeof INGREDIENT_FILTER_TAGS)[number])
      ? activeType
      : null

  return (
    <TagFilter
      tags={[...INGREDIENT_FILTER_TAGS]}
      active={active}
      onChange={(tag) => {
        router.push(buildIngredientsPageHref({ type: tag ?? undefined, sort, q }))
      }}
      className="min-w-0 flex-1"
    />
  )
}
