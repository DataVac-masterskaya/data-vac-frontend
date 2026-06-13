'use client'

import {
  AdministrationIcon,
  Badge,
  type DataTableColumn,
} from '@datavac/ui-kit'
import type { VaccineData } from '../../model/types'
import { formatPermissibility, VACCINE_FIELD_LABELS } from './labels'

const cellTextClassName =
  'min-w-0 break-words text-base font-normal leading-5 text-fg'

export function getVaccineColumns(): DataTableColumn<VaccineData>[] {
  return [
    {
      key: 'name',
      label: VACCINE_FIELD_LABELS.name,
      width: 118,
      sortable: true,
      render: (row) => (
        <span className="min-w-0 break-words text-base font-semibold leading-5 text-fg">
          {row.name}
        </span>
      ),
    },
    {
      key: 'infections',
      label: VACCINE_FIELD_LABELS.infections,
      width: 110,
      render: (row) => (
        <span className="inline-flex min-w-0 items-center gap-1 text-base font-normal leading-5 text-fg">
          {row.infections[0] ?? '—'}
          {row.infections.length > 1 && (
            <Badge>+{row.infections.length - 1}</Badge>
          )}
        </span>
      ),
    },
    {
      key: 'routes',
      label: VACCINE_FIELD_LABELS.routes,
      width: 128,
      render: (row) => (
        <div className="flex items-center gap-1">
          {row.routes.map((method, index) => (
            <AdministrationIcon key={`${method}-${index}`} method={method} />
          ))}
        </div>
      ),
    },
    {
      key: 'contraindications',
      label: VACCINE_FIELD_LABELS.contraindications,
      flex: 1,
      desktopOnly: true,
      render: (row) => (
        <span className={`${cellTextClassName} truncate`}>
          {row.contraindications[0] ?? '—'}
        </span>
      ),
    },
    {
      key: 'ageRange',
      label: VACCINE_FIELD_LABELS.ageRange,
      width: 152,
      mobileHalf: true,
      render: (row) => (
        <span className={cellTextClassName}>{row.ageRange}</span>
      ),
    },
    {
      key: 'permissibility',
      label: VACCINE_FIELD_LABELS.permissibility,
      width: 121,
      render: (row) => (
        <span className={cellTextClassName}>
          {formatPermissibility(row.permissibility)}
        </span>
      ),
    },
    {
      key: 'pregnancyPermissibility',
      label: VACCINE_FIELD_LABELS.pregnancyPermissibility,
      width: 80,
      mobileHalf: true,
      render: (row) => (
        <span className={cellTextClassName}>
          {formatPermissibility(row.pregnancyPermissibility)}
        </span>
      ),
    },
  ]
}