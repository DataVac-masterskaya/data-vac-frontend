import type { Vaccine } from '@/shared/types/api'
import type { VaccineData } from '@/page-components/vaccines/model/types'
import { mapAdministrationMethods } from '@/page-components/vaccines/lib/map-administration-methods'
import { VaccineCatalogItem } from '@/page-components/vaccines/model/catalogTypes'

export function mapVaccineToTableRow(vaccine: Vaccine): VaccineData {
  const ageRange = vaccine.age_allowed || 'не указан'
  return {
    id: String(vaccine.id),
    name: vaccine.name,
    infections: vaccine.infections?.map((i) => i.name) || [],
    routes: mapAdministrationMethods(vaccine.administration_methods?.[0]?.code || ''),
    ageRange: ageRange,
    permissibility: 'allowed',
    pregnancyPermissibility: vaccine.pregnancy_usage_status ? 'allowed' : 'forbidden',
    contraindications: [],
    isIncompatible: false,
  }
}

export function mapVaccineToCatalogItem(vaccine: Vaccine): VaccineCatalogItem {
  return {
    id: String(vaccine.id),
    name: vaccine.name,
    officialName: vaccine.official_name || vaccine.name,
    infections: vaccine.infections?.map((i) => i.name) || [],
    isAvailable: vaccine.is_available_in_rf ?? false,
  }
}
