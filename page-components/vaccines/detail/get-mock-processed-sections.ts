import { MOCK_VACCINES } from '@/shared/api/mock-data'
import { mapVaccineInfections } from '@/page-components/vaccines/lib/map-vaccine-infections'
import { MOCK_PROCESSED_SECTIONS } from './mock-processed-sections'
import type { ProcessedSection } from './ui/vaccine-detail-screen-processed.types'

const PROCESSED_SECTIONS_BY_VACCINE_ID: Partial<Record<number, ProcessedSection[]>> = {
  2: MOCK_PROCESSED_SECTIONS,
}

function personalizeProcessedSections(
  sections: ProcessedSection[],
  vaccineName: string,
  infections: string[],
): ProcessedSection[] {
  const infectionItems = mapVaccineInfections(infections).map(({ name, href }) => ({
    label: name,
    ...(href ? { href } : {}),
  }))

  return sections.map((section) => {
    if (section.kind === 'text' && section.title === 'Полное название вакцины') {
      return {
        ...section,
        text: `${vaccineName} — демонстрационное описание для страницы вакцины.`,
      }
    }

    if (section.kind === 'linkList' && section.title === 'Инфекция') {
      return { ...section, items: infectionItems }
    }

    return section
  })
}

export function getMockProcessedSections(vaccineId: number): ProcessedSection[] {
  const vaccine = MOCK_VACCINES.find((item) => item.id === vaccineId)
  const base = PROCESSED_SECTIONS_BY_VACCINE_ID[vaccineId] ?? MOCK_PROCESSED_SECTIONS

  if (!vaccine || vaccineId === 2) {
    return base
  }

  return personalizeProcessedSections(base, vaccine.name, vaccine.infections)
}
