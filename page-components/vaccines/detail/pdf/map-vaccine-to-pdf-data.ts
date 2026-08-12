import type { Vaccine } from '@/shared/types/api'
import { mapVaccineInstructionSections } from '../map-vaccine-instruction-sections'
import type { VaccinePdfData, VaccinePdfIngredientGroup } from './vaccine-pdf.types'

const ADMIN_IMAGE = '/images/administration-demo.jpg'

function groupIngredientsByRole(
  ingredients: Vaccine['ingredients'],
): VaccinePdfIngredientGroup[] {
  const byRole = new Map<string, string[]>()

  for (const item of ingredients) {
    const role = item.role || 'other'
    const list = byRole.get(role) ?? []
    list.push(item.name)
    byRole.set(role, list)
  }

  return Array.from(byRole.entries()).map(([role, names]) => ({ role, names }))
}

export function mapVaccineToPdfData(vaccine: Vaccine): VaccinePdfData {
  
  const pregnancyAllowed = vaccine.pregnancy_usage_status

  return {
    name: vaccine.name,
    officialName: vaccine.official_name,
    infections: vaccine.infections.map((i) => i.name),
    ageAllowed: vaccine.age_allowed,
    administrationMethods: vaccine.administration_methods
      .filter((m) => m.code || m.note || m.age_group)
      .map((m) => ({
        title: m.code || m.note || 'не указан',
        ageGroup: m.age_group,
        imageSrc: ADMIN_IMAGE,
      })),
    contraindications: vaccine.contraindications.map((c) => ({
      name: c.name,
      type: c.type,
    })),
    ingredients: groupIngredientsByRole(vaccine.ingredients),
    interactionInfo: vaccine.interaction_info,
    pregnancyLabel: pregnancyAllowed ? 'Разрешена' : 'Не разрешена',
    pregnancyCaution: !pregnancyAllowed,
    compatibilityInfo: vaccine.compatibility_info,
    storageConditions: vaccine.storage_conditions,    
    instructionSections: mapVaccineInstructionSections(vaccine),
    specialistUrl: vaccine.instruction_url,
    nonspecUrl: vaccine.nonspec_url,
    orgComment: vaccine.comment?.text ?? null,
    revisionDate: vaccine.revision_date,
  }
}