import { MOCK_INFECTIONS } from '@/shared/api/mock-data'
import type { VaccineSummaryInfection } from '@/page-components/vaccines/ui/vaccine-summary-sidebar/types'

const infectionIdByName = new Map(MOCK_INFECTIONS.map((infection) => [infection.name, infection.id]))

export function mapVaccineInfections(
  infections: { id: number; name: string }[]
): VaccineSummaryInfection[] {
  return infections.map((infection) => ({
    name: infection.name,
    id: infection.id,
    href: `/infections/${infection.id}`,
  }))
}
