import { IngredientClassCell } from './ingredient-class-cell'
import { IngredientNameCell } from './ingredient-name-cell'
import { IngredientWhereUsed } from './ingredient-where-used'
import { INGREDIENT_TABLE_ROW_CLASS } from './ingredient-row-grid'
import type { IngredientRow } from './types'

export type IngredientTableRowProps = {
  ingredient: IngredientRow
}

/** Строка десктоп-таблицы (#28): ячейки в subgrid родительской таблицы */
export function IngredientTableRow({ ingredient }: IngredientTableRowProps) {
  return (
    <div role="row" className={INGREDIENT_TABLE_ROW_CLASS}>
      <IngredientNameCell name={ingredient.name} />
      <IngredientClassCell ingredientClass={ingredient.type} />
      <IngredientWhereUsed href={`/vaccines?ingredient_id=${ingredient.id}`} />
    </div>
  )
}
