import type { AdministrationMethod } from '@datavac/ui-kit'

export type VaccineSummaryInfection = {
  name: string
  id?: number
  href?: string
}

export type AdministrationMethodEntry = {
  method: AdministrationMethod
  note: string | null
}

export type VaccineSummarySidebarProps = {
  infections: VaccineSummaryInfection[]
  pregnancyLabel: string
  showPregnancyWarning: boolean
  ageLabel: string
  administrationMethods: AdministrationMethodEntry[]
  className?: string
}
