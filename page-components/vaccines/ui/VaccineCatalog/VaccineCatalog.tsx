'use client'

import { startTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { DataTable, type SortDirection } from '@datavac/ui-kit'
import { vaccineCatalogColumns } from './vaccineCatalogColumns'
import type { VaccineCatalogItem } from '../../model/catalogTypes'
import { tableSortToVaccine } from '../../model/sort'

interface VaccineCatalogProps {
  data: VaccineCatalogItem[]
  sortField?: string
  sortDirection: SortDirection
}

export function VaccineCatalog({ data, sortField, sortDirection }: VaccineCatalogProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <DataTable
      columns={vaccineCatalogColumns}
      rows={data}
      getRowKey={(row) => row.id}
      sortField={sortField}
      sortDirection={sortDirection}
      onSortChange={(field, direction) => {
        const sortValue = tableSortToVaccine(field, direction)
        const params = new URLSearchParams(searchParams.toString())
        if (sortValue === 'popularity') {
          params.delete('sort')
        } else {
          params.set('sort', sortValue)
        }
        params.delete('page')
        startTransition(() => {
          router.push(`?${params.toString()}`)
        })
      }}
      isRowDisabled={(row) => !row.isAvailable}
      disabledTooltip={
        <span className="flex flex-col gap-0.5">
          <span className="font-semibold leading-4">Об этой вакцине нет сведений.</span>
          <span className="leading-4 text-white/60">Нажмите, чтобы прочитать полную информацию</span>
        </span>
      }
      onRowClick={(row) => {
        router.push(`/vaccines/${row.id}`)
      }}
      className="gap-6"
    />
  )
}
