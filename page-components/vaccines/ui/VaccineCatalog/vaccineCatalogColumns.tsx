'use client'

import { DataTableColumn } from "@datavac/ui-kit";

export const vaccineCatalogColumns: DataTableColumn<VaccineCatalogItem>[] = [
  {
    key: 'name',
    label: 'Название вакцины',
    width: 200,
    sortable: true,
    render: (row) => <span className="font-semibold leading-[1.1]">{row.name}</span>,
  },
  {
    key: 'officialName',
    label: 'Официальное название',
    flex: 1,
    sortable: true,
    render: (row) => (
      <div className="max-w-full min-w-0">
        <div className="break-words whitespace-normal">
          <span className="leading-[1.3]">{row.officialName ?? '-'}</span>
        </div>
      </div>
    ),
  },
  {
    key: 'infections',
    label: 'Инфекции',
    width: 200,
    render: (row) => (
      <div className="flex flex-col">
        {row.infections.map((inf) => <span className="leading-[1.3]" key={inf}>{inf}</span>)}
      </div>
    ),
  },
]
