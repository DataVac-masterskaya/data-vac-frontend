import { CircleXmarkIcon, InfoCircleIcon, MinusIcon } from '@datavac/ui-kit'
import { VaccineInfoBlock } from '@/shared/ui/VaccineInfoBlock'
import { AdministrationImagePanel } from '@/shared/ui/AdministrationImagePanel/AdministrationImagePanel'
import { ProcessedSectionTitle } from './processed-section-title'
import { ProcessedSectionNote } from './processed-section-note'
import { ProcessedLinkRow } from './processed-link-row'
import { getProcessedLinkItemKey } from './get-processed-link-item-key'
import type { ProcessedSection, ProcessedStatusIcon } from './vaccine-detail-screen-processed.types'

const STATUS_ICON: Record<ProcessedStatusIcon, React.ReactNode> = {
  attention: <InfoCircleIcon width={20} height={20} className="text-warning" />,
  incompatible: <CircleXmarkIcon width={20} height={20} className="text-accent" />,
  neutral: (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-subtle text-fg-muted">
      <MinusIcon width={12} height={12} />
    </span>
  ),
}

function ProcessedSectionRenderer({ section }: { section: ProcessedSection }) {
  switch (section.kind) {
    case 'text':
      return (
        <div className="flex flex-col gap-3">
          <ProcessedSectionTitle>{section.title}</ProcessedSectionTitle>
          <p className="whitespace-pre-line text-base text-fg">{section.text}</p>
          <ProcessedSectionNote>{section.note}</ProcessedSectionNote>
        </div>
      )

    case 'linkList':
      return (
        <div className="flex flex-col gap-3">
          <ProcessedSectionTitle>{section.title}</ProcessedSectionTitle>
          <div className="flex flex-col gap-2">
            {section.items.map((item, index) => (
              <ProcessedLinkRow key={getProcessedLinkItemKey(item, index)} {...item} />
            ))}
          </div>
          <ProcessedSectionNote>{section.note}</ProcessedSectionNote>
        </div>
      )

    case 'groupedLinkList':
      return (
        <div className="flex flex-col gap-4">
          <ProcessedSectionTitle>{section.title}</ProcessedSectionTitle>
          {section.groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <span className="text-xs text-fg-muted">{group.label}</span>
              {group.items.map((item, index) => (
                <ProcessedLinkRow key={getProcessedLinkItemKey(item, index)} {...item} />
              ))}
            </div>
          ))}
          <ProcessedSectionNote>{section.note}</ProcessedSectionNote>
        </div>
      )

    case 'status':
      return (
        <div className="flex flex-col gap-4">
          <VaccineInfoBlock title={section.title} text={section.text} icon={STATUS_ICON[section.icon]} />
          {section.items && (
            <div className="flex flex-col gap-2">
              {section.items.map((item, index) => (
                <ProcessedLinkRow key={getProcessedLinkItemKey(item, index)} {...item} />
              ))}
            </div>
          )}
        </div>
      )

    case 'administration':
      return (
        <div className="flex flex-col gap-3">
          <ProcessedSectionTitle>{section.title}</ProcessedSectionTitle>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {section.rows.map((row, index) => (
              <div key={`${row.ageRange}-${index}`} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm text-fg-muted">{row.ageRange}</span>
                {row.listIconUrl && (
                  <AdministrationImagePanel
                    trigger={
                      <img
                        src={row.listIconUrl}
                        alt={row.description}
                        className="h-16 w-16 shrink-0 rounded-lg border border-accent object-cover cursor-pointer"
                      />
                    }
                    title={row.description}
                    imageSrc={row.detailImageUrl ?? row.listIconUrl}
                    imageAlt={row.description}
                    caption={row.note ?? undefined}
                  />
                )}
                {row.method && <span className="max-w-48 text-sm text-fg">{row.description}</span>}
              </div>
            ))}
          </div>
          <ProcessedSectionNote>{section.note}</ProcessedSectionNote>
        </div>
      )
  }
}

export type VaccineDetailScreenProcessedProps = {
  sections: ProcessedSection[]
}

export function VaccineDetailScreenProcessed({ sections }: VaccineDetailScreenProcessedProps) {
  return (
    <div className="flex flex-col gap-8">
      {sections.map((section) => (
        <ProcessedSectionRenderer key={section.title} section={section} />
      ))}
    </div>
  )
}
