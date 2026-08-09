import type { Vaccine } from '@/shared/types/api'
import { mapVaccineInfections } from '@/page-components/vaccines/lib/map-vaccine-infections'
import { MOCK_PROCESSED_SECTIONS } from './mock-processed-sections'
import type { ProcessedLinkItem, ProcessedSection } from './ui/vaccine-detail-screen-processed.types'
import { INFANRIX_DEMO_ID } from './constants'
const PREGNANCY_SECTION_TITLE = 'Применение при беременности и грудном вскармливании'

function mapInfectionItems(vaccine: Vaccine): ProcessedLinkItem[] {
  return mapVaccineInfections(vaccine.infections).map(({ name, href, id }) => ({
    id: id != null ? `infection-${id}` : `infection-${name}`,
    label: name,
    ...(href ? { href } : {}),
  }))
}

function pregnancyStatus(vaccine: Vaccine): { icon: 'neutral' | 'attention'; text: string } {
  return vaccine.pregnancy_usage_status
    ? { icon: 'neutral', text: 'Разрешена' }
    : { icon: 'attention', text: 'Не разрешена' }
}

function patchDemoSection(section: ProcessedSection, vaccine: Vaccine): ProcessedSection {
  if (section.kind === 'linkList' && section.title === 'Инфекция') {
    return { ...section, items: mapInfectionItems(vaccine) }
  }

  if (section.kind === 'status' && section.title === PREGNANCY_SECTION_TITLE) {
    return { ...section, ...pregnancyStatus(vaccine) }
  }

  return section
}

function buildProcessedSectionsFromVaccine(vaccine: Vaccine): ProcessedSection[] {
  const firstMethod = vaccine.administration_methods?.[0]
  const methodText = firstMethod?.code || firstMethod?.note || 'не указан'
  return [
    {
      kind: 'text',
      title: 'Полное название вакцины',
      text: vaccine.official_name || `${vaccine.name} — демонстрационное описание`,
    },
    {
      kind: 'linkList',
      title: 'Инфекция',
      items: mapInfectionItems(vaccine),
    },
    {
      kind: 'administration',
      title: 'Способы введения',
      rows: [
        {
          ageRange: vaccine.age_allowed || 'не указан',
          description: methodText,
        },
      ],
    },
    {
      kind: 'status',
      title: PREGNANCY_SECTION_TITLE,
      ...pregnancyStatus(vaccine),
    },
  ]
}

export function getMockProcessedSections(vaccine: Vaccine): ProcessedSection[] {
  if (vaccine.id === INFANRIX_DEMO_ID) {
    return MOCK_PROCESSED_SECTIONS.map((section) => patchDemoSection(section, vaccine))
  }

  return buildProcessedSectionsFromVaccine(vaccine)
}
