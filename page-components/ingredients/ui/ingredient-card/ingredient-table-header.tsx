import { INGREDIENT_FIELD_LABELS } from './labels'
import { INGREDIENT_TABLE_ROW_SUBGRID_CLASS } from './ingredient-row-grid'

export function IngredientTableHeader() {
  return (
    <div
      className={`${INGREDIENT_TABLE_ROW_SUBGRID_CLASS} mb-5 px-3 text-sm font-normal text-fg-muted`}
      role="row"
    >
      <div role="columnheader" className="flex min-w-0 items-center gap-1">
        <span>{INGREDIENT_FIELD_LABELS.name}</span>
        <span aria-hidden>↓</span>
      </div>
      <div role="columnheader" className="min-w-0">
        {INGREDIENT_FIELD_LABELS.class}
      </div>
      <div
        role="columnheader"
        className="pointer-events-none invisible min-w-0 select-none"
        aria-hidden
      >
        {INGREDIENT_FIELD_LABELS.whereUsed}
      </div>
    </div>
  )
}
