'use client'

import type { ReactNode } from 'react'
import { cn } from '@datavac/ui-kit'
import { useVaccineTableDesktop } from './use-vaccine-table-media'

export const VACCINE_NAME_CELL_TEXT_CLASS_NAME =
  'min-w-0 break-words font-semibold text-fg text-sm leading-5'

export function getVaccineDataCellTextClassName(isDesktop: boolean): string {
  return isDesktop
    ? 'min-w-0 break-words font-normal text-fg text-base leading-6'
    : 'min-w-0 break-words font-normal text-fg text-sm leading-5'
}

type VaccineDataCellTextProps = {
  children: ReactNode
  className?: string
}

export function VaccineDataCellText({
  children,
  className,
}: VaccineDataCellTextProps) {
  const isDesktop = useVaccineTableDesktop()
  const textClassName = getVaccineDataCellTextClassName(isDesktop)

  return <span className={cn(textClassName, className)}>{children}</span>
}
