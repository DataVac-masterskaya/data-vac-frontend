'use client'

import { useState, type ReactNode } from 'react'
import { Tabs } from '@datavac/ui-kit'
import { VaccineDetailScreenProcessed } from './vaccine-detail-screen-processed'
import { VaccineDetailScreenInstruction } from './vaccine-detail-screen-instruction'
import type { ProcessedSection } from './vaccine-detail-screen-processed.types'
import type { VaccineInstructionSection } from './vaccine-detail-screen-instruction.types'

const TAB_PROCESSED = 'processed'
const TAB_INSTRUCTION = 'instruction'

type VaccineDetailContentProps = {
  processedSections: ProcessedSection[]
  instructionSections: VaccineInstructionSection[]
  orgComment?: ReactNode
}

export function VaccineDetailContent({
  processedSections,
  instructionSections,
  orgComment,
}: VaccineDetailContentProps) {
  const [activeId, setActiveId] = useState(TAB_PROCESSED)

  const tabs = [
    {
      id: TAB_PROCESSED,
      label: 'Переработанная информация из разделов',
      content: (
        <VaccineDetailScreenProcessed
          sections={processedSections}
          orgComment={orgComment}
        />
      ),
    },
    {
      id: TAB_INSTRUCTION,
      label: 'Информация из инструкции',
      content: (
        <VaccineDetailScreenInstruction sections={instructionSections} />
      ),
    },
  ]

  return (
    <Tabs
      tabs={tabs}
      activeId={activeId}
      onChange={setActiveId}
      listClassName="flex gap-6 border-b border-border mb-6"
      tabClassName="pb-3 text-sm text-fg-muted font-normal border-b-2 border-transparent -mb-px data-[state=active]:font-semibold data-[state=active]:text-fg data-[state=active]:border-accent"
      contentClassName="min-w-0"
    />
  )
}
