import type { ReactNode } from 'react'
import type { Vaccine } from '@/shared/types/api'
import type { VaccineSummarySidebarProps } from '@/page-components/vaccines/ui/vaccine-summary-sidebar/types'
import { getMockInstructionSections } from './get-mock-instruction-sections'
import { getMockProcessedSections } from './get-mock-processed-sections'
import { mapVaccineToOrgComment } from './map-vaccine-org-comment'
import { mapVaccineToSummary } from './map-vaccine-summary'
import type { ProcessedSection } from './ui/vaccine-detail-screen-processed.types'
import type { VaccineInstructionSection } from './ui/vaccine-detail-screen-instruction.types'

type VaccineDetailPageData = {
  summary: VaccineSummarySidebarProps
  processedSections: ProcessedSection[]
  instructionSections: VaccineInstructionSection[]
  orgComment: ReactNode | undefined
}

export function mapVaccineToDetailPageData(vaccine: Vaccine): VaccineDetailPageData {
  return {
    summary: mapVaccineToSummary(vaccine),
    // TODO: когда API будет готов — маппить vaccine.processed_sections / instruction_sections
    processedSections: getMockProcessedSections(vaccine),
    instructionSections: getMockInstructionSections(vaccine),
    orgComment: mapVaccineToOrgComment(vaccine),
  }
}
