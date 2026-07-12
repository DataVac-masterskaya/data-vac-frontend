import type { Vaccine } from '@/shared/types/api'
import { formatAgeLabel } from '@/page-components/vaccines/lib/format-age-label'
import { MOCK_INSTRUCTION_SECTIONS } from './mock-instruction-sections'
import type { VaccineInstructionSection } from './ui/vaccine-detail-screen-instruction.types'

const INFANRIX_DEMO_ID = 2

function buildInstructionSectionsFromVaccine(vaccine: Vaccine): VaccineInstructionSection[] {
  const ageLabel = formatAgeLabel(vaccine.min_age_months, vaccine.max_age_months)

  return [
    {
      title: 'Допустимый возраст',
      content: `Вакцина ${vaccine.name} показана для применения ${ageLabel.toLowerCase()}.`,
    },
    {
      title: 'Способы введения',
      content: `Вакцину ${vaccine.name} следует вводить ${vaccine.administration_method.toLowerCase()}.`,
    },
    {
      title: 'Полный текст инструкции',
      content:
        'Полный текст инструкции будет доступен после подключения API. Сейчас отображаются только данные из карточки вакцины.',
    },
  ]
}

export function getMockInstructionSections(vaccine: Vaccine): VaccineInstructionSection[] {
  if (vaccine.id === INFANRIX_DEMO_ID) {
    return MOCK_INSTRUCTION_SECTIONS
  }

  return buildInstructionSectionsFromVaccine(vaccine)
}
