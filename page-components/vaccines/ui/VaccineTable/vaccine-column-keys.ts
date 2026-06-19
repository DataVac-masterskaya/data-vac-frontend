export type VaccineColumnKey =
  | 'name'
  | 'infections'
  | 'routes'
  | 'contraindications'
  | 'ageRange'
  | 'pregnancyPermissibility'

/** Figma 1920 — горизонтальная таблица */
export const VACCINE_DESKTOP_COLUMN_ORDER = [
  'name',
  'infections',
  'routes',
  'contraindications',
  'ageRange',
  'pregnancyPermissibility',
] as const satisfies readonly VaccineColumnKey[]

/** Figma 768 — tablet-карточки 3×2 */
export const VACCINE_TABLET_COLUMN_ORDER = [
  'name',
  'infections',
  'routes',
  'ageRange',
  'pregnancyPermissibility',
  'contraindications',
] as const satisfies readonly VaccineColumnKey[]

/** Figma 360 — mobile stack */
export const VACCINE_MOBILE_COLUMN_ORDER = [
  'name',
  'infections',
  'routes',
  'contraindications',
  'ageRange',
  'pregnancyPermissibility',
] as const satisfies readonly VaccineColumnKey[]


