'use client'

import { useState, type ReactNode } from 'react'
import { Tabs, cn } from '@datavac/ui-kit'
import { useSummarySidebarMediaContext } from '@/page-components/vaccines/ui/vaccine-summary-sidebar/summary-sidebar-media-context'
import { VaccineDetailScreenProcessed } from './vaccine-detail-screen-processed'
import { VaccineDetailScreenInstruction } from './vaccine-detail-screen-instruction'
import { ProcessedOrgComment } from './processed-org-comment'
import type { ProcessedSection } from './vaccine-detail-screen-processed.types'
import type { VaccineInstructionSection } from './vaccine-detail-screen-instruction.types'

const TAB_PROCESSED = 'processed'
const TAB_INSTRUCTION = 'instruction'

type VaccineDetailContentProps = {
  processedSections: ProcessedSection[]
  instructionSections: VaccineInstructionSection[]
  orgComment?: ReactNode
}

const WIDE_PANEL_SCROLL_CLASS = cn(
  'summary-wide:max-h-[calc(100dvh-240px)] summary-wide:overflow-y-auto summary-wide:overflow-x-hidden summary-wide:pr-2',
  'summary-wide:[scrollbar-width:thin] summary-wide:[scrollbar-color:var(--color-accent)_transparent]',
  'summary-wide:[&::-webkit-scrollbar]:w-0.5',
  'summary-wide:[&::-webkit-scrollbar-track]:bg-transparent',
  'summary-wide:[&::-webkit-scrollbar-thumb]:rounded-full summary-wide:[&::-webkit-scrollbar-thumb]:bg-accent',
)

export function VaccineDetailContent({
  processedSections,
  instructionSections,
  orgComment,
}: VaccineDetailContentProps) {
  const { isWide } = useSummarySidebarMediaContext()
  const [activeId, setActiveId] = useState(TAB_PROCESSED)

  const tabs = [
    {
      id: TAB_PROCESSED,
      label: 'Переработанная информация из разделов',
      content:
        activeId === TAB_PROCESSED ? (
          <VaccineDetailScreenProcessed
            sections={processedSections}
            orgComment={isWide ? undefined : orgComment}
          />
        ) : null,
    },
    {
      id: TAB_INSTRUCTION,
      label: 'Информация из инструкции',
      content:
        activeId === TAB_INSTRUCTION ? (
          <VaccineDetailScreenInstruction sections={instructionSections} />
        ) : null,
    },
  ]

  const showWideOrgComment = isWide && activeId === TAB_PROCESSED && orgComment

  return (
    <div className="min-w-0 w-full rounded-[16px] bg-card p-4">
      <div className={WIDE_PANEL_SCROLL_CLASS}>
        <Tabs
          tabs={tabs}
          activeId={activeId}
          onChange={setActiveId}
          className="summary-wide:flex summary-wide:flex-col summary-wide:gap-0"
          listClassName={cn(
            'flex shrink-0 gap-6 border-b border-border mb-6',
            'summary-wide:sticky summary-wide:top-0 summary-wide:z-10 summary-wide:bg-card',
          )}
          tabClassName="pb-3 text-sm text-fg-muted font-normal data-[state=active]:font-semibold data-[state=active]:text-fg"
          contentClassName="min-w-0"
        />
      </div>
      {showWideOrgComment && <ProcessedOrgComment>{orgComment}</ProcessedOrgComment>}
    </div>
  )
}
