import { ArrowUpRightFromSquareIcon, FileArrowDownIcon } from '@datavac/ui-kit'

type Props = {
  officialLinkUrl?: string | null
  instructionSpecialistUrl?: string | null
}

export function VaccineInstructionLinks({ officialLinkUrl, instructionSpecialistUrl }: Props) {
  if (!officialLinkUrl && !instructionSpecialistUrl) return null

  return (
    <div className="flex items-center gap-3 shrink-0 pt-1">
      <span className="text-sm text-fg-muted whitespace-nowrap">Инструкции для:</span>
      {officialLinkUrl && (
        <a
          href={officialLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline whitespace-nowrap"
        >
          Неспециалистов
          <ArrowUpRightFromSquareIcon width={14} height={14} className="shrink-0" />
        </a>
      )}
      {instructionSpecialistUrl && (
        <a
          href={instructionSpecialistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-fg hover:text-accent hover:underline whitespace-nowrap"
        >
          Специалистов
          <FileArrowDownIcon width={14} height={14} className="shrink-0" />
        </a>
      )}
    </div>
  )
}
