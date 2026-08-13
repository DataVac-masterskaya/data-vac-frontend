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
  
  export type VaccinePdfData = {
    name: string
    officialName: string | null
    infections: string[]
    ageAllowed: string | null
    administrationMethods: VaccinePdfAdministrationMethod[]
    contraindications: { name: string; type: string }[]
    ingredients: VaccinePdfIngredientGroup[]
    interactionInfo: string | null
    pregnancyLabel: string | null
    pregnancyCaution: boolean
    compatibilityInfo: string | null
    storageConditions: string | null
    instructionSections: VaccinePdfInstructionSection[]
    specialistUrl: string | null
    nonspecUrl: string | null
    orgComment: string | null // АНО: показывать только если не null
    revisionDate: string | null
    logoSrc: string
  }