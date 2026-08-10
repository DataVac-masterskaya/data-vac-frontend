import type { Vaccine } from '@/shared/types/api'
import type { VaccineInstructionSection } from './ui/vaccine-detail-screen-instruction.types'

export function mapVaccineInstructionSections(vaccine: Vaccine): VaccineInstructionSection[] {
  const sections: VaccineInstructionSection[] = []

  if (vaccine.age_allowed) {
    sections.push({
      title: 'Допустимый возраст',
      content: `Вакцина ${vaccine.name} показана для применения ${vaccine.age_allowed}.`,
    })
  }

  const firstMethod = vaccine.administration_methods?.find((m) => m.code || m.note)
  if (firstMethod) {
    const methodText = firstMethod.code || firstMethod.note!
    sections.push({
      title: 'Способы введения',
      content: `Вакцину ${vaccine.name} следует вводить ${methodText}.`,
    })
  }

  if (vaccine.indications) {
    sections.push({ title: 'Показания', content: vaccine.indications })
  }

  if (vaccine.side_effects) {
    sections.push({ title: 'Побочные эффекты', content: vaccine.side_effects })
  }

  if (vaccine.interaction_info) {
    sections.push({ title: 'Взаимодействие с препаратами', content: vaccine.interaction_info })
  }

  if (vaccine.compatibility_info) {
    sections.push({
      title: 'Одновременное введение с другими вакцинами',
      content: vaccine.compatibility_info,
    })
  }

  if (vaccine.storage_conditions) {
    sections.push({ title: 'Хранение', content: vaccine.storage_conditions })
  }

  sections.push({
    title: 'Полный текст инструкции',
    content: vaccine.instruction_url || 'Инструкция не доступна',
  })

  return sections
}
