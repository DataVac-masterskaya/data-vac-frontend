'use client'

import { Badge, type DataTableColumn } from '@datavac/ui-kit'
import type { VaccineData } from '../../model/types'
import { formatPermissibility, VACCINE_FIELD_LABELS } from './labels'
import {
  VACCINE_COUNT_BADGE_CLASS_NAME,
  VaccineRoutesCell,
} from './vaccine-routes-cell'
import {
  VACCINE_NAME_CELL_TEXT_CLASS_NAME,
  VaccineDataCellText,
} from './vaccine-table-text'

/** Пропорции ширин колонок по Figma 1920 (180:180:128:351:180:136). routes +3 к Figma 128 — место под 3 иконки + badge при ≥1600. */
const COLUMN_FLEX = {
  name: 18,
  infections: 18,
  routes: 21,
  contraindications: 29,
  ageRange: 18,
  pregnancy: 14,
} as const

export const VACCINE_TABLE_WIDTH_CLASS =
  'w-full max-w-[1016px] xl:max-w-[1312px]'

export function getVaccineColumns(): DataTableColumn<VaccineData>[] {
  return [
    {
      key: 'name',
      label: VACCINE_FIELD_LABELS.name,
      flex: COLUMN_FLEX.name,
      sortable: true,
      render: (row) => (
        <span className={VACCINE_NAME_CELL_TEXT_CLASS_NAME}>{row.name}</span>
      ),
    },
    {
      key: 'infections',
      label: VACCINE_FIELD_LABELS.infections,
      flex: COLUMN_FLEX.infections,
      render: (row) => (
        <span className="inline-flex min-w-0 items-start gap-1">
          <VaccineDataCellText>{row.infections[0] ?? '—'}</VaccineDataCellText>
          {row.infections.length > 1 && (
            <Badge className={VACCINE_COUNT_BADGE_CLASS_NAME}>
              +{row.infections.length - 1}
            </Badge>
          )}
        </span>
      ),
    },
    {
      key: 'routes',
      label: VACCINE_FIELD_LABELS.routes,
      flex: COLUMN_FLEX.routes,
      render: (row) => <VaccineRoutesCell routes={row.routes} />,
    },
    {
      key: 'contraindications',
      label: VACCINE_FIELD_LABELS.contraindications,
      flex: COLUMN_FLEX.contraindications,
      desktopOnly: true,
      render: (row) => (
        <span className="inline-flex min-w-0 flex-wrap items-start gap-1">
          <VaccineDataCellText>
            {row.contraindications[0] ?? '—'}
          </VaccineDataCellText>
          {row.contraindications.length > 1 && (
            <Badge className={VACCINE_COUNT_BADGE_CLASS_NAME}>
              +{row.contraindications.length - 1}
            </Badge>
          )}
        </span>
      ),
    },
    {
      key: 'ageRange',
      label: VACCINE_FIELD_LABELS.ageRange,
      flex: COLUMN_FLEX.ageRange,
      mobileHalf: true,
      render: (row) => (
        <VaccineDataCellText>{row.ageRange}</VaccineDataCellText>
      ),
    },
    {
      key: 'pregnancyPermissibility',
      label: VACCINE_FIELD_LABELS.pregnancyPermissibility,
      flex: COLUMN_FLEX.pregnancy,
      mobileHalf: true,
      render: (row) => (
        <VaccineDataCellText>
          {formatPermissibility(row.pregnancyPermissibility)}
        </VaccineDataCellText>
      ),
    },
  ]
}
