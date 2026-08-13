import type { ReactNode } from 'react'
import type { Vaccine } from '@/shared/types/api'
import type { VaccineSummarySidebarProps } from '@/page-components/vaccines/ui/vaccine-summary-sidebar/types'
import { mapVaccineInstructionSections } from './map-vaccine-instruction-sections'
import { mapVaccineProcessedSections } from './map-vaccine-processed-sections'
import { mapVaccineToOrgComment } from './map-vaccine-org-comment'
import { mapVaccineToSummary } from './map-vaccine-summary'
import type { ProcessedSection } from './ui/vaccine-detail-screen-processed.types'
import type { VaccineInstructionSection } from './ui/vaccine-detail-screen-instruction.types'
import { mapVaccineToPdfData } from './pdf'

type VaccineDetailPageData = {
  summary: VaccineSummarySidebarProps
  processedSections: ProcessedSection[]
  instructionSections: VaccineInstructionSection[]
  orgComment: ReactNode | undefined
}

export function mapVaccineToDetailPageData(vaccine: Vaccine): VaccineDetailPageData {
  return {
    summary: {
      ...mapVaccineToSummary(vaccine),
      pdfData: mapVaccineToPdfData(vaccine),
    },
    
    processedSections: mapVaccineProcessedSections(vaccine),
    instructionSections: mapVaccineInstructionSections(vaccine),
    orgComment: mapVaccineToOrgComment(vaccine),
  }
}
