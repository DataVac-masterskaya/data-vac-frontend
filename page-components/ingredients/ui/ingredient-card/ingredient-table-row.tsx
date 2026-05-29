import { IngredientClassCell } from './ingredient-class-cell'
import { ingredientVaccinesHref } from './ingredient-links'
import { IngredientNameCell } from './ingredient-name-cell'
import { IngredientWhereUsed } from './ingredient-where-used'
import { INGREDIENT_TABLE_ROW_CLASS } from './ingredient-row-grid'
import type { IngredientListItemProps } from './types'

/** Строка десктоп-таблицы (#28): ячейки в subgrid родительской таблицы */
export function IngredientTableRow({ ingredient }: IngredientListItemProps) {
  return (
    <div role="row" className={INGREDIENT_TABLE_ROW_CLASS}>
      <IngredientNameCell name={ingredient.name} />
      <IngredientClassCell ingredientClass={ingredient.type} />
      <IngredientWhereUsed href={ingredientVaccinesHref(ingredient.id)} />
    </div>
  )
}
