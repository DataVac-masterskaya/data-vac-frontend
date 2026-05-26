import { IngredientClassCell } from './ingredient-class-cell'
import { IngredientNameCell } from './ingredient-name-cell'
import { IngredientWhereUsed } from './ingredient-where-used'
import { INGREDIENT_ROW_GRID_CLASS } from './ingredient-row-grid'
import type { IngredientRow } from './types'

export type IngredientCardProps = {
  ingredient: IngredientRow
}

/** Строка таблицы ингредиентов (#28): без hover/active на контейнере */
export function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <div
      className={`${INGREDIENT_ROW_GRID_CLASS} rounded-xl bg-card px-3 py-[11px]`}
    >
      <IngredientNameCell name={ingredient.name} />
      <IngredientClassCell ingredientClass={ingredient.type} />
      <IngredientWhereUsed href={`/vaccines?ingredient_id=${ingredient.id}`} />
    </div>
  )
}
