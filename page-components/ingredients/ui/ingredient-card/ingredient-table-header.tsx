import { INGREDIENT_TABLE_ROW_SUBGRID_CLASS } from './ingredient-row-grid'

type IngredientTableHeaderProps = {
  className?: string
}

export function IngredientTableHeader({ className }: IngredientTableHeaderProps) {
  return (
    <div
      className={[
        INGREDIENT_TABLE_ROW_SUBGRID_CLASS,
        'mb-5 px-3 text-sm font-normal text-fg-muted',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="row"
    >
      <div role="columnheader" className="flex min-w-0 items-center gap-1">
        <span>Наименование компонента</span>
        <span aria-hidden>↓</span>
      </div>
      <div role="columnheader" className="min-w-0">
        Класс
      </div>
      <div
        role="columnheader"
        className="pointer-events-none invisible min-w-0 select-none"
        aria-hidden
      >
        Где содержится
      </div>
    </div>
  )
}
