'use client'

import { TagFilter } from '@datavac/ui-kit'
import { useRouter } from 'next/navigation'
import type { IngredientSortValue } from '../model/sort'
import { buildIngredientsPageHref } from '../model/sort'
import {
  INGREDIENT_CATEGORY_TAGS,
  INGREDIENT_FILTER_ALL_TAG,
  INGREDIENT_FILTER_TAGS,
  type IngredientCategoryTag,
} from '../model/filter-tags'

type Props = {
  activeType?: string
  sort: IngredientSortValue
  q?: string
}

export function IngredientsFilter({ activeType, sort, q }: Props) {
  const router = useRouter()

  const active =
    activeType &&
    INGREDIENT_CATEGORY_TAGS.includes(activeType as IngredientCategoryTag)
      ? activeType
      : INGREDIENT_FILTER_ALL_TAG

  return (
    <TagFilter
      tags={[...INGREDIENT_FILTER_TAGS]}
      active={active}
      onChange={(tag) => {
        const type =
          tag === null || tag === INGREDIENT_FILTER_ALL_TAG ? undefined : tag
        router.push(buildIngredientsPageHref({ type, sort, q }))
      }}
      className="min-w-0 flex-1"
    />
  )
}
