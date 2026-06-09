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
