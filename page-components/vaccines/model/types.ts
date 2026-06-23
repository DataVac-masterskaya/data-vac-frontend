import type { AdministrationMethod } from '@datavac/ui-kit'

export type Permissibility = 'allowed' | 'caution' | 'forbidden'

export interface VaccineData {
  id: string
  name: string
  infections: string[]
  routes: AdministrationMethod[]
  contraindications: string[]
  ageRange: string
  permissibility: Permissibility
  pregnancyPermissibility: Permissibility
  isIncompatible?: boolean
}

