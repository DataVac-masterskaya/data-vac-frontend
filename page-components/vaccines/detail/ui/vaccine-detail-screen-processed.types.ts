export type ProcessedLinkItem = {
  id?: string
  label: string
  href?: string
  note?: string
}

export type ProcessedLinkGroup = {
  label: string
  items: ProcessedLinkItem[]
}

export type ProcessedAdministrationRow = {
  ageRange: string
  description: string
  method?: string
  note?: string | null
}

export type ProcessedStatusIcon = 'attention' | 'incompatible' | 'neutral'

export type ProcessedSection =
  | { kind: 'text'; title: string; text: string; note?: string }
  | { kind: 'linkList'; title: string; items: ProcessedLinkItem[]; note?: string }
  | { kind: 'groupedLinkList'; title: string; groups: ProcessedLinkGroup[]; note?: string }
  | {
      kind: 'status'
      title: string
      icon: ProcessedStatusIcon
      text: string
      items?: ProcessedLinkItem[]
    }
  | {
      kind: 'administration'
      title: string
      rows: ProcessedAdministrationRow[]
      note?: string
    }
