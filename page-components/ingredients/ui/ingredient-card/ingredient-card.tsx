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
    <div className="rounded-xl bg-card px-3 py-[11px]">
      <div className="flex flex-col gap-1 md:hidden">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[14px] font-normal leading-[1.3] text-fg-muted">
            Наименование компонента
          </span>
          <IngredientWhereUsed
            href={`/vaccines?ingredient_id=${ingredient.id}`}
            label="Подробнее"
            variant="mobile"
          />
        </div>
        <IngredientNameCell name={ingredient.name} />
        <span className="mt-2 text-[14px] font-normal leading-[1.3] text-fg-muted">
          Класс
        </span>
        <IngredientClassCell ingredientClass={ingredient.type} />
      </div>

      <div className={`${INGREDIENT_ROW_GRID_CLASS} max-md:hidden`}>
        <IngredientNameCell name={ingredient.name} />
        <IngredientClassCell ingredientClass={ingredient.type} />
        <IngredientWhereUsed href={`/vaccines?ingredient_id=${ingredient.id}`} />
      </div>
    </div>
  )
}
