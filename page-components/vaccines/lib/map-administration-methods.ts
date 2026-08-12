import type { AdministrationMethod } from '@datavac/ui-kit'

const METHOD_LABEL_TO_CODES: Record<string, AdministrationMethod[]> = {
  Накожно: ['cutaneously'],
  Внутримышечно: ['intramuscularly'],
  Подкожно: ['subcutaneously'],
  Внутрикожно: ['intradermally'],
  'Перорально: капли': ['drops'],
  'Перорально: таблетки': ['pills'],
  Интраназально: ['intranasally'],
}

export const ADMINISTRATION_CODE_TO_LABEL: Record<string, string> = {
  cutaneously: 'Накожно',
  intramuscularly: 'Внутримышечно',
  subcutaneously: 'Подкожно',
  intradermally: 'Внутрикожно',
  drops: 'Перорально: капли',
  pills: 'Перорально: таблетки',
  intranasally: 'Интраназально',
}

export function mapAdministrationMethods(label: string): AdministrationMethod[] {
  return METHOD_LABEL_TO_CODES[label] ?? []
}

export function mapAdministrationMethodsFromApi(
  methods: { code: string | null; age_group: string | null; note: string | null }[]
): AdministrationMethod[] {
  return methods
    .map((m) => m.code)
    .filter((code): code is AdministrationMethod => code !== null)
}
