export type VaccinePdfQr = {
  label: string
  url: string
}

export type VaccinePdfAdministrationMethod = {
  title: string
  ageGroup: string | null
  imageSrc: string
}

export type VaccinePdfIngredientGroup = {
  role: string
  names: string[]
}

export type VaccinePdfInstructionSection = {
  title: string
  content: string | string[]
}

export type VaccinePdfContraindicationGroup = {
  label: string
  items: string[]
}

export type VaccinePdfData = {
  name: string
  officialName: string | null
  infections: string[]
  ageAllowed: string | null
  administrationMethods: VaccinePdfAdministrationMethod[]
  contraindicationGroups: VaccinePdfContraindicationGroup[]
  ingredients: VaccinePdfIngredientGroup[]
  interactionInfo: string | null
  pregnancyLabel: string | null
  pregnancyCaution: boolean
  compatibilityInfo: string | null
  storageConditions: string | null
  storageLines: string[]
  instructionSections: VaccinePdfInstructionSection[]
  specialistUrl: string | null
  nonspecUrl: string | null
  orgComment: string | null
  revisionDate: string | null
  logoSrc: string
}
