import type { AdministrationMethod } from '@datavac/ui-kit'
import type { AdministrationRoute } from '@/page-components/vaccines/model/types'
import { mediaUrl } from '@/shared/api/media-url'

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
  inhalationally: 'Ингаляционно',
  instillation_bladder: 'Инстилляция в мочевой пузырь',
  other: 'Другим способом',
}

export function mapAdministrationMethodsFromApi(
  methods: { code: string | null; age_group: string | null; note: string | null; list_icon_url: string | null; detail_image_url: string | null }[]
): AdministrationRoute[] {
  const seen = new Set<string>()
  const result: AdministrationRoute[] = []

  for (const m of methods) {
    if (m.code === null) continue
    if (seen.has(m.code)) continue
    seen.add(m.code)
    result.push({
      code: m.code,
      knownMethod: KNOWN_METHODS.has(m.code) ? (m.code as AdministrationMethod) : null,
      listIconUrl: mediaUrl(m.list_icon_url),
    })
  }

  return result
}
