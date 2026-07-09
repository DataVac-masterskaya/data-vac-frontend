import { MOCK_VACCINES } from '@/shared/api/mock-data'
import { MOCK_INSTRUCTION_SECTIONS } from './mock-instruction-sections'
import type { VaccineInstructionSection } from './ui/vaccine-detail-screen-instruction.types'

const INSTRUCTION_SECTIONS_BY_VACCINE_ID: Partial<Record<number, VaccineInstructionSection[]>> = {
  2: MOCK_INSTRUCTION_SECTIONS,
}

function personalizeInstructionContent(content: string, vaccineName: string): string {
  return content.replace(/Инфанрикс Гекса/g, vaccineName)
}

function personalizeInstructionSections(
  sections: VaccineInstructionSection[],
  vaccineName: string,
): VaccineInstructionSection[] {
  return sections.map((section) => ({
    ...section,
    content: Array.isArray(section.content)
      ? section.content.map((item) => personalizeInstructionContent(item, vaccineName))
      : personalizeInstructionContent(section.content, vaccineName),
  }))
}

export function getMockInstructionSections(vaccineId: number): VaccineInstructionSection[] {
  const vaccine = MOCK_VACCINES.find((item) => item.id === vaccineId)
  const base = INSTRUCTION_SECTIONS_BY_VACCINE_ID[vaccineId] ?? MOCK_INSTRUCTION_SECTIONS

  if (!vaccine || vaccineId === 2) {
    return base
  }

  return personalizeInstructionSections(base, vaccine.name)
}
