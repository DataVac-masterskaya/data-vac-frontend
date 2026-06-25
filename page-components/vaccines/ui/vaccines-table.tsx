'use client'

import { useRouter } from 'next/navigation'
import type { SortDirection } from '@datavac/ui-kit'
import type { VaccineData } from '../model/types'
import { buildVaccinesPageHref, tableSortToVaccine } from '../model/sort'
import { VaccineTable } from './VaccineTable/VaccineTable'

export const VACCINE_PAGE_WIDTH_CLASS =
  'w-full max-w-[720px] xl:max-w-[1016px] min-[1920px]:max-w-[1312px]'

type VaccinesTableProps = {
  vaccines: VaccineData[]
  sortField?: string
  sortDirection: SortDirection
  q?: string
  ingredientId?: number
  infectionId?: number
  className?: string
}

export function VaccinesTable({
  vaccines,
  sortField,
  sortDirection,
  q,
  ingredientId,
  infectionId,
  className,
}: VaccinesTableProps) {
  const router = useRouter()

  return (
    <VaccineTable
      vaccines={vaccines}
      sortField={sortField}
      sortDirection={sortDirection}
      className={className}
      onSortChange={(field, direction) => {
        router.push(
          buildVaccinesPageHref({
            sort: tableSortToVaccine(field, direction),
            q,
            ingredientId,
            infectionId,
          }),
        )
      }}
      onRowClick={(vaccine) => {
        router.push(`/vaccines/${vaccine.id}`)
      }}
    />
  )
}
