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
      isRowDisabled={(row) => !row.isAvailable}
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
        startTransition(() => {
          router.push(`?${params.toString()}`)
        })
      }}
      onRowClick={(row) => {
        router.push(`/vaccines/${row.id}`)
      }}
      disabledTooltip={
        <div className="max-w-[180px]">
          <p className="font-semibold">Об этой вакцине нет сведений.</p>
          <p className="italic opacity-60">Нажмите, чтобы прочитать полную информацию</p>
        </div>
      }
      className="gap-6"
    />
  )
}
