import type { Vaccine } from '@/shared/types/api'
import { formatAgeLabel } from '@/page-components/vaccines/lib/format-age-label'
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
  return vaccine.allowed_during_pregnancy
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
  return [
    {
      kind: 'text',
      title: 'Полное название вакцины',
      text: `${vaccine.name} — демонстрационное описание для страницы вакцины.`,
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
          ageRange: formatAgeLabel(vaccine.min_age_months, vaccine.max_age_months),
          description: vaccine.administration_method,
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
