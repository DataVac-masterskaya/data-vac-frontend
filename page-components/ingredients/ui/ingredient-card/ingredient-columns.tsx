import { IngredientClassCell } from './ingredient-class-cell'
import { IngredientNameCell } from './ingredient-name-cell'
import { IngredientWhereUsed } from './ingredient-where-used'
import type { DataTableColumn, IngredientRow } from './types'

export function getIngredientColumns(): DataTableColumn<IngredientRow>[] {
  return [
    {
      key: 'name',
      label: 'Наименование компонента',
      flex: 1,
      sortable: true,
      render: (row) => <IngredientNameCell name={row.name} />,
    },
    {
      key: 'type',
      label: 'Класс',
      flex: 1,
      sortable: true,
      render: (row) => <IngredientClassCell ingredientClass={row.type} />,
    },
    {
      key: 'whereUsed',
      label: '',
      width: 172,
      render: (row) => (
        <IngredientWhereUsed href={`/vaccines?ingredient_id=${row.id}`} />
      ),
    },
  ]
}
