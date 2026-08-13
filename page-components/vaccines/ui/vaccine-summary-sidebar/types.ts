import type { AdministrationMethod } from '@datavac/ui-kit'
import type { VaccinePdfData } from '@/page-components/vaccines/detail/pdf'


export type VaccineSummaryInfection = {
  name: string
  id?: number
  href?: string
}

export type AdministrationMethodEntry = {
  method: AdministrationMethod
  note: string | null
  ageGroup: string | null
  detailImageUrl: string | null
}

export type VaccineSummarySidebarProps = {
  infections: VaccineSummaryInfection[]
  pregnancyLabel: string
  showPregnancyWarning: boolean
  ageLabel: string
  administrationMethods: AdministrationMethodEntry[]
  className?: string
  pdfData: VaccinePdfData
}
