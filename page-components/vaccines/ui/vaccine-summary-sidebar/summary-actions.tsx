'use client'

import { CopyLinkButton } from '@/shared/ui/CopyLinkButton'
import { DownloadPdfButton } from '@/shared/ui/DownloadPdfButton'

export function SummaryActions() {
  return (
    <div className="flex items-center justify-start gap-2">
      <CopyLinkButton />
      <DownloadPdfButton disabled />
    </div>
  )
}
