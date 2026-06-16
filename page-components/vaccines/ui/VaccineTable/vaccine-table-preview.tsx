'use client'

import { useRouter } from 'next/navigation'
import { DataTable } from '@datavac/ui-kit'
import { useVaccineTableColumns } from './vaccineColumns'
import { MOCK_VACCINE_DATA_ROWS } from './mock-vaccine-data'

export function VaccineTablePreview() {
  const router = useRouter()
  const { layout, columns, maxWidthPx } = useVaccineTableColumns()

  return (
    <div className="w-full" style={{ maxWidth: maxWidthPx }}>
      <DataTable
        key={layout}
        className="w-full"
        columns={columns}
        rows={MOCK_VACCINE_DATA_ROWS}
        getRowKey={(row) => row.id}
        desktopBreakpoint="lg"
        tabletColumns={3}
        mobileActionLabel="Подробнее"
      mobileDisabledLabel="Нет сведений"
        isRowDisabled={(row) => !!row.isIncompatible}
        onRowClick={(row) => router.push(`/vaccines/${row.id}`)}
        sortField="name"
        sortDirection="asc"
        onSortChange={() => {}}
      />
    </div>
  )
}
