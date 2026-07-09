import type { Vaccine } from '@/shared/types/api'
import { getMockProcessedSections } from './get-mock-processed-sections'
import type { ProcessedSection } from './ui/vaccine-detail-screen-processed.types'

export function mapVaccineToProcessedSections(vaccine: Vaccine): ProcessedSection[] {
  // TODO: когда API будет готов — маппить vaccine.processed_sections
  return getMockProcessedSections(vaccine.id)
}
