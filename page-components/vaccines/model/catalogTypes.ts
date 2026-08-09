import { VaccineInfection } from "@/shared/types/api"

export interface VaccineCatalogItem {
  id: string
  name: string
  officialName: string | null
  infections: VaccineInfection[]
  isAvailable: boolean
}
