import type { AdministrationMethod } from '@datavac/ui-kit'

export type VaccineSummaryInfection = {
  name: string
  id?: number
  href?: string
}

export type VaccineSummarySidebarProps = {
  infections: VaccineSummaryInfection[]
  pregnancyLabel: string
  showPregnancyWarning: boolean
  ageLabel: string
  administrationMethods: AdministrationMethod[]
  className?: string
}
