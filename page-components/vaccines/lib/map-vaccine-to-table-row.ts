import type { VaccineListItem } from '@/shared/types/api'
import type { VaccineData } from '@/page-components/vaccines/model/types'
import { VaccineCatalogItem } from '@/page-components/vaccines/model/catalogTypes'

export function mapVaccineToTableRow(vaccine: VaccineListItem): VaccineData {
  return {
    id: String(vaccine.id),
    name: vaccine.name,
    infections: vaccine.infections.map((i) => i.name),
    routes: [],
    ageRange: 'не указан',
    permissibility: 'allowed',
    pregnancyPermissibility: 'allowed',
    contraindications: [],
    isIncompatible: false,
  }
}

export function mapVaccineToCatalogItem(vaccine: VaccineListItem): VaccineCatalogItem {
  return {
    id: String(vaccine.id),
    name: vaccine.name,
    officialName: vaccine.official_name || vaccine.name,
    infections: vaccine.infections.map((i) => i.name),
    isAvailable: vaccine.is_available_in_rf,
  }
}
