'use client'

import { PillActionButton } from '@/shared/ui/PillActionButton'

type DownloadPdfButtonProps = {
  disabled?: boolean
  onClick?: () => void
}

export function DownloadPdfButton({ disabled = true, onClick }: DownloadPdfButtonProps) {
  return (
    <PillActionButton
      type="button"
      disabled={disabled}
      onClick={onClick}
      textWeight={false}
      className="font-medium summary-wide:font-normal"
    >
      Скачать PDF
    </PillActionButton>
  )
}
