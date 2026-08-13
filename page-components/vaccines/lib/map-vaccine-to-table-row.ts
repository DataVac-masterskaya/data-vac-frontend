import type { VaccineListItem } from '@/shared/types/api'
import type { VaccineData } from '@/page-components/vaccines/model/types'
import { VaccineCatalogItem } from '@/page-components/vaccines/model/catalogTypes'
import { mapAdministrationMethodsFromApi } from './map-administration-methods'

export function mapVaccineToTableRow(vaccine: VaccineListItem): VaccineData {
  return {
    id: String(vaccine.id),
    name: vaccine.name,
    infections: vaccine.infections,
    routes: mapAdministrationMethodsFromApi(vaccine.administration_methods),
    ageRange: vaccine.age_allowed ?? 'Не ограничено',
    permissibility: 'allowed',
    pregnancyPermissibility: vaccine.pregnancy_usage_status ? 'allowed' : 'forbidden',
    contraindications: vaccine.contraindications.map((c) => c.name),
    isIncompatible: false,
  }
}

export function mapVaccineToCatalogItem(vaccine: VaccineListItem): VaccineCatalogItem {
  return {
    id: String(vaccine.id),
    name: vaccine.name,
    officialName: vaccine.official_name,
    infections: vaccine.infections,
    isAvailable: vaccine.is_available_in_rf,
  }
}
