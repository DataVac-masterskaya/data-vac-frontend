import type { ReactNode } from 'react'
import type { Vaccine } from '@/shared/types/api'
import type { VaccineSummarySidebarProps } from '@/page-components/vaccines/ui/vaccine-summary-sidebar/types'
import { mapVaccineToInstructionSections } from './map-vaccine-instruction'
import { mapVaccineToOrgComment } from './map-vaccine-org-comment'
import { mapVaccineToProcessedSections } from './map-vaccine-processed'
import { mapVaccineToSummary } from './map-vaccine-summary'
import type { ProcessedSection } from './ui/vaccine-detail-screen-processed.types'
import type { VaccineInstructionSection } from './ui/vaccine-detail-screen-instruction.types'

export type VaccineDetailPageData = {
  name: string
  summary: VaccineSummarySidebarProps
  processedSections: ProcessedSection[]
  instructionSections: VaccineInstructionSection[]
  orgComment: ReactNode | undefined
}

export function mapVaccineToDetailPageData(vaccine: Vaccine): VaccineDetailPageData {
  return {
    name: vaccine.name,
    summary: mapVaccineToSummary(vaccine),
    processedSections: mapVaccineToProcessedSections(vaccine),
    instructionSections: mapVaccineToInstructionSections(vaccine),
    orgComment: mapVaccineToOrgComment(vaccine),
  }
}
