import { IngredientClassCell } from './ingredient-class-cell'
import { IngredientNameCell } from './ingredient-name-cell'
import { IngredientWhereUsed } from './ingredient-where-used'
import type { IngredientRow } from './types'

export type IngredientCardProps = {
  ingredient: IngredientRow
}

/** Мобильная карточка ингредиента; десктоп — IngredientTableRow в общей grid */
export function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <div className="rounded-xl bg-card px-3 py-[11px]">
      <div className="flex flex-col gap-1">
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
    </div>
  )
}
