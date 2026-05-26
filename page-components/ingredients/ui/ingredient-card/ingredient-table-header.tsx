import { INGREDIENT_ROW_GRID_CLASS } from './ingredient-row-grid'

type IngredientTableHeaderProps = {
  className?: string
}

export function IngredientTableHeader({ className }: IngredientTableHeaderProps) {
  return (
    <div
      className={[
        INGREDIENT_ROW_GRID_CLASS,
        'mb-6 px-3 text-sm font-normal text-fg-muted',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="row"
    >
      <div role="columnheader" className="flex items-center gap-1">
        <span>Наименование компонента</span>
        <span aria-hidden>↓</span>
      </div>
      <div role="columnheader">Класс</div>
      <div role="columnheader" className="sr-only">
        Действие
      </div>
    </div>
  )
}
