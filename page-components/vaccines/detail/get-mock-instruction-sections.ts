import type { Vaccine } from '@/shared/types/api'
import { MOCK_INSTRUCTION_SECTIONS } from './mock-instruction-sections'
import type { VaccineInstructionSection } from './ui/vaccine-detail-screen-instruction.types'
import { INFANRIX_DEMO_ID } from './constants'

function buildInstructionSectionsFromVaccine(vaccine: Vaccine): VaccineInstructionSection[] {
  const ageLabel = vaccine.age_allowed || 'не указан'
  const firstMethod = vaccine.administration_methods?.[0]
  const methodText = firstMethod?.code || firstMethod?.note || 'не указан'

  return [
    {
      title: 'Допустимый возраст',
      content: `Вакцина ${vaccine.name} показана для применения ${ageLabel}.`,
    },
    {
      title: 'Способы введения',
      content: `Вакцину ${vaccine.name} следует вводить ${methodText}.`,
    },
    {
      title: 'Полный текст инструкции',
      content:
        vaccine.instruction_url || 'Инструкция не доступна'
    },
  ]
}

export function getMockInstructionSections(vaccine: Vaccine): VaccineInstructionSection[] {
  if (vaccine.id === INFANRIX_DEMO_ID) {
    return MOCK_INSTRUCTION_SECTIONS
  }

  return buildInstructionSectionsFromVaccine(vaccine)
}
