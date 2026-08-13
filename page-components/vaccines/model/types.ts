import { VaccineInfection } from '@/shared/types/api'
import type { AdministrationMethod } from '@datavac/ui-kit'

export type Permissibility = 'allowed' | 'caution' | 'forbidden'

export type AdministrationRoute = {
  code: string | null
  knownMethod: AdministrationMethod | null
  listIconUrl: string | null
}

export interface VaccineData {
  id: string
  name: string
  infections: VaccineInfection[]
  routes: AdministrationRoute[]
  contraindications: string[]
  ageRange: string
  permissibility: Permissibility
  pregnancyPermissibility: Permissibility
  isIncompatible?: boolean
}

