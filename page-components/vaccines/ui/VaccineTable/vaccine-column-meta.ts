import type { DataTableColumn } from '@datavac/ui-kit'
import type { VaccineData } from '../../model/types'
import { VACCINE_FIELD_LABELS } from './labels'
import type { VaccineColumnKey } from './vaccine-column-keys'

/** Пропорции по Figma 1920; routes +3 под 3 иконки + badge */
export const VACCINE_COLUMN_FLEX: Record<VaccineColumnKey, number> = {
  name: 18,
  infections: 18,
  routes: 21,
  contraindications: 29,
  ageRange: 18,
  pregnancyPermissibility: 14,
}

type ColumnMeta = Pick<
  DataTableColumn<VaccineData>,
  'label' | 'flex' | 'sortable' | 'mobileHalf' | 'tooltip'
>

export const VACCINE_COLUMN_META: Record<VaccineColumnKey, ColumnMeta> = {
  name: {
    label: VACCINE_FIELD_LABELS.name,
    flex: VACCINE_COLUMN_FLEX.name,
    sortable: true,
  },
  infections: {
    label: VACCINE_FIELD_LABELS.infections,
    flex: VACCINE_COLUMN_FLEX.infections,
  },
  routes: {
    label: VACCINE_FIELD_LABELS.routes,
    flex: VACCINE_COLUMN_FLEX.routes,
  },
  contraindications: {
    label: VACCINE_FIELD_LABELS.contraindications,
    flex: VACCINE_COLUMN_FLEX.contraindications,
  },
  ageRange: {
    label: VACCINE_FIELD_LABELS.ageRange,
    flex: VACCINE_COLUMN_FLEX.ageRange,
    mobileHalf: true,
    tooltip: 'Возрастные ограничения применения вакцины',
  },
  pregnancyPermissibility: {
    label: VACCINE_FIELD_LABELS.pregnancyPermissibility,
    flex: VACCINE_COLUMN_FLEX.pregnancyPermissibility,
    mobileHalf: true,
  },
}

export const VACCINE_COUNT_BADGE_CLASS_NAME =
  'inline-flex h-5 min-w-[23px] shrink-0 items-center justify-center rounded-pill bg-subtle px-1 text-sm font-medium leading-4 text-accent'
