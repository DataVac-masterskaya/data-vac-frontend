'use client'

export { useSummaryValueTextXl } from './use-summary-sidebar-media'

export const summaryValueTextClassName =
  'font-normal text-fg text-[14px] leading-5 summary-wide:text-[16px] summary-wide:leading-6'

export function getSummaryValueTextClassName(isWide: boolean): string {
  return isWide
    ? 'font-normal text-fg text-[16px] leading-6'
    : 'font-normal text-fg text-[14px] leading-5'
}
