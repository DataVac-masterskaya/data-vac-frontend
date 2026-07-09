import type { Vaccine } from '@/shared/types/api'
import type { VaccineCatalogItem } from '@/page-components/vaccines/model/catalogTypes'

export function mapVaccineToCatalogItem(vaccine: Vaccine): VaccineCatalogItem {
  return {
    id: String(vaccine.id),
    name: vaccine.name,
    officialName: null,
    infections: vaccine.infections,
    isAvailable: true,
  }
}
