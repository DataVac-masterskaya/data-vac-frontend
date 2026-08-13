import type { DataTableColumn } from '@datavac/ui-kit'
import type { ReactNode } from 'react'
import type { VaccineData } from '../../model/types'
import { VACCINE_FIELD_LABELS } from './labels'
import type { VaccineColumnKey } from './vaccine-column-keys'
import { VaccineInfoPanel } from '@/shared/ui/VaccineInfoPanel'


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
  'flex' | 'sortable' | 'mobileHalf' | 'tooltip' | 'sortLabel'
> & { label: ReactNode }

export const VACCINE_COLUMN_META: Record<VaccineColumnKey, ColumnMeta> = {
  name: {
    label: VACCINE_FIELD_LABELS.name,
    flex: VACCINE_COLUMN_FLEX.name,
    sortLabel: 'названию',
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
    label: (
      <VaccineInfoPanel
        trigger={<span>{VACCINE_FIELD_LABELS.ageRange}</span>}
        title="Возрастные ограничения"
        question="А что значит до 15 лет? Это до 15 лет включительно или до 14 лет включительно?"
        explanation="К сожалению, в инструкциях нет единого подхода к описанию допустимого возраста, однако в нашем приложении все возрастные границы — включительные. То есть, если говорится, что вакцина может использоваться до 15 лет, это означает, что ее можно вводить хоть за день до шестнадцатилетия. А вот в 16 лет уже нельзя. Также формулировку о допустимом возрасте именно в том виде, в котором онна есть в инструкции, вы сможете прочесть в версии на печать."
      />
    ),
    flex: VACCINE_COLUMN_FLEX.ageRange,
    mobileHalf: true,
    tooltip: (
      <span className="flex flex-col">
        <span className=" leading-4 font-semibold text-white">Возрастные ограничения.</span>
        <span className="leading-4 text-white/60 italic">Нажмите, чтобы прочитать полную информацию</span>
      </span>
    ),
  },
  pregnancyPermissibility: {
    label: VACCINE_FIELD_LABELS.pregnancyPermissibility,
    flex: VACCINE_COLUMN_FLEX.pregnancyPermissibility,
    mobileHalf: true,
  },
  
}

export const VACCINE_COUNT_BADGE_CLASS_NAME =
  'inline-flex h-5 min-w-[23px] shrink-0 items-center justify-center rounded-pill bg-subtle px-1 text-sm font-medium leading-4 text-accent'
