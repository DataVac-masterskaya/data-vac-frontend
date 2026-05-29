import { IngredientClassCell } from './ingredient-class-cell'
import { ingredientVaccinesHref } from './ingredient-links'
import { INGREDIENT_FIELD_LABELS } from './labels'
import { IngredientNameCell } from './ingredient-name-cell'
import { IngredientWhereUsed } from './ingredient-where-used'
import type { IngredientListItemProps } from './types'

/** Мобильная карточка ингредиента; десктоп — IngredientTableRow в общей grid */
export function IngredientCard({ ingredient }: IngredientListItemProps) {
  return (
    <div className="rounded-xl bg-card px-3 py-[11px]">
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[14px] font-normal leading-[1.3] text-fg-muted">
            {INGREDIENT_FIELD_LABELS.name}
          </span>
          <IngredientWhereUsed
            href={ingredientVaccinesHref(ingredient.id)}
            label="Подробнее"
            variant="mobile"
          />
        </div>
        <IngredientNameCell name={ingredient.name} />
        <span className="mt-2 text-[14px] font-normal leading-[1.3] text-fg-muted">
          {INGREDIENT_FIELD_LABELS.class}
        </span>
        <IngredientClassCell ingredientClass={ingredient.type} />
      </div>
    </div>
  )
}
