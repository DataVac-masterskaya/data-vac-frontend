'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { SortDirection } from '@datavac/ui-kit'
import { VaccineTable } from './VaccineTable'
import { MOCK_VACCINE_DATA_ROWS } from './mock-vaccine-data'

export function VaccineTablePreview() {
  const router = useRouter()
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const sortedVaccines = useMemo(() => {
    const rows = [...MOCK_VACCINE_DATA_ROWS]

    if (sortField !== 'name') {
      return rows
    }

    rows.sort((a, b) =>
      sortDirection === 'asc'
        ? a.name.localeCompare(b.name, 'ru')
        : b.name.localeCompare(a.name, 'ru'),
    )

    return rows
  }, [sortField, sortDirection])

  return (
    <VaccineTable
      vaccines={sortedVaccines}
      sortField={sortField}
      sortDirection={sortDirection}
      onSortChange={(field, direction) => {
        setSortField(field)
        setSortDirection(direction)
      }}
      onRowClick={(row) => router.push(`/vaccines/${row.id}`)}
    />
  )
}