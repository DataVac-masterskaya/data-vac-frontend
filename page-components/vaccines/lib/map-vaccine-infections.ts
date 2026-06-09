import { MOCK_INFECTIONS } from '@/shared/api/mock-data'
import type { VaccineSummaryInfection } from '@/page-components/vaccines/ui/vaccine-summary-sidebar/types'

const infectionIdByName = new Map(MOCK_INFECTIONS.map((infection) => [infection.name, infection.id]))

export function mapVaccineInfections(names: string[]): VaccineSummaryInfection[] {
  return names.map((name) => {
    const id = infectionIdByName.get(name)

    return {
      name,
      id,
      href: id != null ? `/infections/${id}` : undefined,
    }
  })
}
