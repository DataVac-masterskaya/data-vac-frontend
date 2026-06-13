import type { Permissibility } from '../../model/types'

export const VACCINE_FIELD_LABELS = {
  name: 'Название',
  infections: 'Инфекция',
  routes: 'Способ введения',
  contraindications: 'Противопоказания',
  ageRange: 'Возраст',
  permissibility: 'Допустимость',
  pregnancyPermissibility: 'При беременности и ГВ',
} as const

export const PERMISSIBILITY_LABELS: Record<Permissibility, string> = {
  allowed: 'Можно',
  caution: 'С осторожностью',
  forbidden: 'Нельзя',
}

export function formatPermissibility(value: Permissibility): string {
  return PERMISSIBILITY_LABELS[value]
}