import type { AdministrationMethod } from '@datavac/ui-kit'
import type { AdministrationRoute } from '@/page-components/vaccines/model/types'

const KNOWN_METHODS = new Set<string>([
  'cutaneously',
  'intramuscularly',
  'subcutaneously',
  'intradermally',
  'drops',
  'pills',
  'intranasally',
])

export const ADMINISTRATION_CODE_TO_LABEL: Record<string, string> = {
  cutaneously: 'Накожно',
  intramuscularly: 'Внутримышечно',
  subcutaneously: 'Подкожно',
  intradermally: 'Внутрикожно',
  drops: 'Перорально: капли',
  pills: 'Перорально: таблетки',
  intranasally: 'Интраназально',
}

export function mapAdministrationMethodsFromApi(
  methods: { code: string | null; age_group: string | null; note: string | null; list_icon_url: string | null; detail_image_url: string | null }[]
): AdministrationRoute[] {
  return methods
    .filter((m) => m.code !== null || m.list_icon_url !== null)
    .map((m) => ({
      code: m.code,
      knownMethod: m.code && KNOWN_METHODS.has(m.code) ? (m.code as AdministrationMethod) : null,
      listIconUrl: m.list_icon_url,
    }))
}
