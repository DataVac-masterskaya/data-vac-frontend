import type { ProcessedLinkItem } from './vaccine-detail-screen-processed.types'

export function getProcessedLinkItemKey(item: ProcessedLinkItem, index: number): string {
  return item.id ?? item.href ?? `${item.label}-${index}`
}
