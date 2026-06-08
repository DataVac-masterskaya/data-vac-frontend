'use client'

import { useRouter } from 'next/navigation'
import { DataTable } from '@datavac/ui-kit'
import type { DataTableColumn, SortDirection } from '@datavac/ui-kit'
import type { Ingredient } from '@/shared/types/api'
import { buildIngredientsPageHref, type IngredientSortValue } from '../model/sort'
import { ingredientVaccinesHref } from './ingredient-links'
import { INGREDIENT_FIELD_LABELS } from './labels'

export const INGREDIENT_TABLE_WIDTH_CLASS =
  'w-full max-w-[720px] md:max-w-[1016px] xl:max-w-[1312px]'

const COLUMNS: DataTableColumn<Ingredient>[] = [
  {
    key: 'name',
    label: INGREDIENT_FIELD_LABELS.name,
    flex: 2,
    sortable: true,
    render: (row) => <span className="font-semibold">{row.name}</span>,
  },
  {
    key: 'type',
    label: INGREDIENT_FIELD_LABELS.class,
    flex: 1,
  },
]

type Props = {
  ingredients: Ingredient[]
  sortField: string
  sortDirection: SortDirection
  type?: string
  className?: string
}

export function IngredientsTable({
  ingredients,
  sortField,
  sortDirection,
  type,
  className,
}: Props) {
  const router = useRouter()

  return (
    <DataTable
      className={className}
      columns={COLUMNS}
      rows={ingredients}
      getRowKey={(row) => String(row.id)}
      sortField={sortField}
      sortDirection={sortDirection}
      onSortChange={(field, dir) => {
        const sort = (dir === 'desc' ? `${field}_desc` : field) as IngredientSortValue
        router.push(buildIngredientsPageHref({ type, sort }))
      }}
      onRowClick={(row) => router.push(ingredientVaccinesHref(row.id))}
      mobileActionLabel="Подробнее"
    />
  )
}
