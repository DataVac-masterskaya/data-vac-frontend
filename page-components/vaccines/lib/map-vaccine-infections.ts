import type { VaccineInfection } from '@/shared/types/api'
import type { VaccineSummaryInfection } from '@/page-components/vaccines/ui/vaccine-summary-sidebar/types'

export function mapVaccineInfections(infections: VaccineInfection[]): VaccineSummaryInfection[] {
  return infections.map(({ id, name }) => ({
    name,
    id,
    href: `/infections/${id}`,
  }))
}
