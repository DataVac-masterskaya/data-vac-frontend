import type { Vaccine } from '@/shared/types/api'
import { formatAgeLabel } from '@/page-components/vaccines/lib/format-age-label'
import { mapAdministrationMethods } from '@/page-components/vaccines/lib/map-administration-methods'
import { mapVaccineInfections } from '@/page-components/vaccines/lib/map-vaccine-infections'
import type { VaccineSummarySidebarProps } from '@/page-components/vaccines/ui/vaccine-summary-sidebar/types'

export function mapVaccineToSummary(vaccine: Vaccine): VaccineSummarySidebarProps {
  return {
    infections: mapVaccineInfections(vaccine.infections),
    pregnancyLabel: vaccine.allowed_during_pregnancy ? 'Разрешена' : 'Не разрешена',
    showPregnancyWarning: !vaccine.allowed_during_pregnancy,
    ageLabel: formatAgeLabel(vaccine.min_age_months, vaccine.max_age_months),
    administrationMethods: mapAdministrationMethods(vaccine.administration_method),
  }
}
