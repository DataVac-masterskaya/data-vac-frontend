import type { DataTableColumn } from '@datavac/ui-kit'
import type { Ingredient } from '@/shared/types/api'
import { ingredientVaccinesHref } from '../ingredient-links'
import { INGREDIENT_FIELD_LABELS } from '../labels'
import { IngredientWhereUsed } from './ingredient-where-used'

export function getIngredientColumns(): DataTableColumn<Ingredient>[] {
  return [
    {
      key: 'name',
      label: INGREDIENT_FIELD_LABELS.name,
      flex: 1,
      sortable: true,
      render: (row) => (
        <span className="min-w-0 break-words text-base font-semibold leading-5 text-fg">
          {row.name}
        </span>
      ),
    },
    {
      key: 'type',
      label: INGREDIENT_FIELD_LABELS.class,
      flex: 1,
      sortable: true,
      render: (row) => (
        <span className="min-w-0 break-words text-base font-normal leading-5 text-fg">
          {row.type}
        </span>
      ),
    },
    {
      key: 'whereUsed',
      label: '',
      width: 172,
      render: (row) => (
        <IngredientWhereUsed href={ingredientVaccinesHref(row.id)} />
      ),
    },
  ]
}