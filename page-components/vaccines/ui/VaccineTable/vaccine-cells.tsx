'use client'

import type { ReactNode } from 'react'
import { Badge } from '@datavac/ui-kit'
import type { VaccineData } from '../../model/types'
import { formatPermissibility } from './labels'
import { VACCINE_COUNT_BADGE_CLASS_NAME } from './vaccine-column-meta'
import type { VaccineColumnKey } from './vaccine-column-keys'
import { VaccineRoutesCell } from './vaccine-routes-cell'
import {
  VACCINE_NAME_CELL_TEXT_CLASS_NAME,
  VaccineDataCellText,
} from './vaccine-table-text'

type ListCellProps = {
  items: string[]
}

function VaccineListWithBadgeCell({ items }: ListCellProps) {
  return (
    <span className="inline-flex min-w-0 flex-wrap items-start gap-1">
      <VaccineDataCellText>{items[0] ?? '—'}</VaccineDataCellText>
      {items.length > 1 && (
        <Badge className={VACCINE_COUNT_BADGE_CLASS_NAME}>
          +{items.length - 1}
        </Badge>
      )}
    </span>
  )
}

export const vaccineCellRenderers: {
  [K in VaccineColumnKey]: (row: VaccineData) => ReactNode
} = {
  name: (row) => (
    <span className={VACCINE_NAME_CELL_TEXT_CLASS_NAME}>{row.name}</span>
  ),
  infections: (row) => (
    <VaccineListWithBadgeCell items={row.infections} />
  ),
  routes: (row) => <VaccineRoutesCell routes={row.routes} />,
  contraindications: (row) => (
    <VaccineListWithBadgeCell items={row.contraindications} />
  ),
  ageRange: (row) => (
    <VaccineDataCellText>{row.ageRange}</VaccineDataCellText>
  ),
  pregnancyPermissibility: (row) => (
    <VaccineDataCellText>
      {formatPermissibility(row.pregnancyPermissibility)}
    </VaccineDataCellText>
  ),
}
