'use client'

import { useMemo } from 'react'
import type { DataTableColumn } from '@datavac/ui-kit'
import type { VaccineData } from '../../model/types'
import { vaccineCellRenderers } from './vaccine-cells'
import { VACCINE_COLUMN_META } from './vaccine-column-meta'
import {
  VACCINE_DESKTOP_COLUMN_ORDER,
  VACCINE_MOBILE_COLUMN_ORDER,
  VACCINE_TABLET_COLUMN_ORDER,
  type VaccineColumnKey,
} from './vaccine-column-keys'
import { getVaccineTableMaxWidthPx } from './vaccine-table-width'
import { useVaccineTableDesktop } from './use-vaccine-table-desktop'
import {
  useVaccineTableLayout,
  type VaccineTableLayout,
} from './use-vaccine-table-layout'

export type { VaccineTableLayout }
export {
  getVaccineTableMaxWidthPx,
  VACCINE_TABLE_MAX_WIDTH_PX,
} from './vaccine-table-width'

function buildVaccineColumns(
  order: readonly VaccineColumnKey[],
): DataTableColumn<VaccineData>[] {
  return order.map((key) => ({
    key,
    ...VACCINE_COLUMN_META[key],
    render: vaccineCellRenderers[key],
  }))
}

export function getVaccineDesktopColumns(): DataTableColumn<VaccineData>[] {
  return buildVaccineColumns(VACCINE_DESKTOP_COLUMN_ORDER)
}

export function getVaccineTabletColumns(): DataTableColumn<VaccineData>[] {
  return buildVaccineColumns(VACCINE_TABLET_COLUMN_ORDER)
}

export function getVaccineMobileColumns(): DataTableColumn<VaccineData>[] {
  return buildVaccineColumns(VACCINE_MOBILE_COLUMN_ORDER)
}

export function getVaccineColumnsForLayout(
  layout: VaccineTableLayout,
): DataTableColumn<VaccineData>[] {
  switch (layout) {
    case 'desktop':
      return getVaccineDesktopColumns()
    case 'tablet':
      return getVaccineTabletColumns()
    case 'mobile':
      return getVaccineMobileColumns()
  }
}

export function getVaccineColumns(): DataTableColumn<VaccineData>[] {
  return getVaccineDesktopColumns()
}

export function useVaccineTableColumns(): {
  layout: VaccineTableLayout
  columns: DataTableColumn<VaccineData>[]
  maxWidthPx: number
} {
  const layout = useVaccineTableLayout()
  const isWideDesktop = useVaccineTableDesktop()
  const columns = useMemo(
    () => getVaccineColumnsForLayout(layout),
    [layout],
  )
  const maxWidthPx = getVaccineTableMaxWidthPx(layout, isWideDesktop)

  return { layout, columns, maxWidthPx }
}
