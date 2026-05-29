import type { Ingredient } from '@/shared/types/api'

export type IngredientRow = Ingredient

export type IngredientListItemProps = {
  ingredient: IngredientRow
}

export type IngredientNameCellProps = {
  name: string
}

export type IngredientClassCellProps = {
  ingredientClass: string
}

export type IngredientWhereUsedProps = {
  href: string
  label?: string
  variant?: 'default' | 'mobile'
}
