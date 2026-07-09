import type { Vaccine } from '@/shared/types/api'
import { getMockInstructionSections } from './get-mock-instruction-sections'
import type { VaccineInstructionSection } from './ui/vaccine-detail-screen-instruction.types'

export function mapVaccineToInstructionSections(vaccine: Vaccine): VaccineInstructionSection[] {
  // TODO: когда API будет готов — маппить vaccine.instruction_sections
  return getMockInstructionSections(vaccine.id)
}
