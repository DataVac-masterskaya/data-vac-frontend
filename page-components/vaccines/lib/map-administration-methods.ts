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

export function mapAdministrationMethods(label: string): AdministrationMethod[] {
  return METHOD_LABEL_TO_CODES[label] ?? []
}

export function mapAdministrationMethodsFromApi(
  methods: { code: string | null; age_group: string | null; note: string | null }[]
): AdministrationMethod[] {
  if (!methods || methods.length === 0) return []

  const firstMethod = methods[0]
  if (!firstMethod.code) return []

  for (const [label, codes] of Object.entries(METHOD_LABEL_TO_CODES)) {
    if (codes.includes(firstMethod.code as AdministrationMethod)) {
      return codes
    }
  }

  return []
}
