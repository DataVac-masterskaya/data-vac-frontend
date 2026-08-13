import type { Vaccine } from '@/shared/types/api'
import { mapVaccineInfections } from '@/page-components/vaccines/lib/map-vaccine-infections'
import type { AdministrationMethod } from '@datavac/ui-kit'
import type { VaccineSummarySidebarProps } from '../ui/vaccine-summary-sidebar/types'

const KNOWN_METHODS = new Set<string>([
  'cutaneously', 'intramuscularly', 'subcutaneously',
  'intradermally', 'drops', 'pills', 'intranasally',
])

export function mapVaccineToSummary(
  vaccine: Vaccine,
): Omit<VaccineSummarySidebarProps, 'pdfData'> {
  return {
    infections: mapVaccineInfections(vaccine.infections),
    pregnancyLabel: vaccine.pregnancy_usage_status ? 'Разрешена' : 'Не разрешена',
    showPregnancyWarning: !vaccine.pregnancy_usage_status,
    ageLabel: vaccine.age_allowed || 'не указан',
    administrationMethods: (() => {
      const seen = new Set<string>()
      return vaccine.administration_methods
        .filter((m) => m.code !== null && KNOWN_METHODS.has(m.code))
        .filter((m) => {
          if (seen.has(m.code!)) return false
          seen.add(m.code!)
          return true
        })
        .map((m) => ({ method: m.code as AdministrationMethod, note: m.note, ageGroup: m.age_group }))
    })(),
  }
}
