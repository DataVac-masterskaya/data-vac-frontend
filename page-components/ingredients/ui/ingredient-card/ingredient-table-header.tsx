import { INGREDIENT_ROW_GRID_TEMPLATE } from './ingredient-row-grid'

type IngredientTableHeaderProps = {
  className?: string
}

export function IngredientTableHeader({ className }: IngredientTableHeaderProps) {
  return (
    <div
      className={[
        `grid w-full max-md:hidden ${INGREDIENT_ROW_GRID_TEMPLATE}`,
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
