import type { Vaccine } from '@/shared/types/api'
import { mapVaccineInfections } from '@/page-components/vaccines/lib/map-vaccine-infections'
import type { AdministrationMethod } from '@datavac/ui-kit'
import type { VaccineSummarySidebarProps } from '../ui/vaccine-summary-sidebar/types'

export function mapVaccineToSummary(vaccine: Vaccine): VaccineSummarySidebarProps {
  return {
    infections: mapVaccineInfections(vaccine.infections),
    pregnancyLabel: vaccine.pregnancy_usage_status ? 'Разрешена' : 'Не разрешена',
    showPregnancyWarning: !vaccine.pregnancy_usage_status,
    ageLabel: vaccine.age_allowed || 'не указан',
    administrationMethods: vaccine.administration_methods
      .filter((m): m is typeof m & { code: string } => m.code !== null)
      .map((m) => ({ method: m.code as AdministrationMethod, note: m.note, ageGroup: m.age_group })),
  }
}
