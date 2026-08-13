'use client'

import { useState } from 'react'
import { CopyLinkButton } from '@/shared/ui/CopyLinkButton'
import { DownloadPdfButton } from '@/shared/ui/DownloadPdfButton'
import { downloadVaccinePdf } from '@/page-components/vaccines/detail/pdf'
import type { VaccinePdfData } from '@/page-components/vaccines/detail/pdf'

type Props = {
  pdfData: VaccinePdfData
}

export function SummaryActions({ pdfData }: Props) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    if (loading) return
    setLoading(true)
    try {
      await downloadVaccinePdf(pdfData)
    } catch (error) {
      console.error('PDF download failed', error)
      // позже можно toast
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-start gap-2">
      <CopyLinkButton />
      <DownloadPdfButton disabled={loading} onClick={handleDownload} />
    </div>
  )
}
