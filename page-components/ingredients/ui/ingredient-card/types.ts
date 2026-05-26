import type { ReactNode } from 'react'
import type { Ingredient } from '@/shared/types/api'

export type IngredientRow = Ingredient

export type IngredientNameCellProps = {
  name: string
}

export type IngredientClassCellProps = {
  ingredientClass: string
}

export type IngredientWhereUsedProps = {
  href: string
  label?: string
}

/** TODO: import from @datavac/ui-kit when DataTable ships (#18) */
export type DataTableColumn<T> = {
  key: string
  label: string
  width?: string | number
  flex?: number
  sortable?: boolean
  render?: (row: T, index: number) => ReactNode
}
