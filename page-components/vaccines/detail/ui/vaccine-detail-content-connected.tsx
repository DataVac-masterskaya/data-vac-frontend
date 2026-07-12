'use client'

import type { ReactNode } from 'react'
import { useSummarySidebarMediaContext } from '@/page-components/vaccines/ui/vaccine-summary-sidebar/summary-sidebar-media-context'
import { VaccineDetailContent } from './vaccine-detail-content'
import type { ProcessedSection } from './vaccine-detail-screen-processed.types'
import type { VaccineInstructionSection } from './vaccine-detail-screen-instruction.types'

type Props = {
  processedSections: ProcessedSection[]
  instructionSections: VaccineInstructionSection[]
  orgComment?: ReactNode
}

export function VaccineDetailContentConnected(props: Props) {
  const { isWide } = useSummarySidebarMediaContext()
  return <VaccineDetailContent {...props} isWide={isWide} />
}
