import { pdf } from '@react-pdf/renderer'
import QRCode from 'qrcode'
import { createElement } from 'react'
import { VaccinePdfDocument } from './vaccine-pdf-document'
import type { VaccinePdfData } from './vaccine-pdf.types'
import { registerPdfFonts } from './register-pdf-fonts'

const BLOB_URL_REVOKE_MS = 60_000

function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  if (typeof window === 'undefined') return path
  return `${window.location.origin}${path.startsWith('/') ? '' : '/'}${path}`
}

async function makeQrDataUrl(url: string | null | undefined): Promise<string | undefined> {
  if (!url) return undefined
  return QRCode.toDataURL(url, {
    width: 256,
    margin: 1,
    errorCorrectionLevel: 'M',
  })
}

function withAbsoluteImages(data: VaccinePdfData): VaccinePdfData {
  return {
    ...data,
    logoSrc: toAbsoluteUrl(data.logoSrc),
    administrationMethods: data.administrationMethods.map((m) => ({
      ...m,
      imageSrc: toAbsoluteUrl(m.imageSrc),
    })),
  }
}


export async function downloadVaccinePdf(data: VaccinePdfData): Promise<void> {
  registerPdfFonts()

  const win = window.open('about:blank', '_blank')
  if (!win) {
    throw new Error('Не удалось открыть PDF: браузер заблокировал всплывающее окно')
  }

  try {
    const [specialist, nonspec] = await Promise.all([
      makeQrDataUrl(data.specialistUrl),
      makeQrDataUrl(data.nonspecUrl),
    ])

    const blob = await pdf(
      createElement(VaccinePdfDocument, {
        data: withAbsoluteImages(data),
        qrImages: { specialist, nonspec },
      }) as Parameters<typeof pdf>[0],
    ).toBlob()

    const objectUrl = URL.createObjectURL(blob)
    win.location.href = objectUrl
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), BLOB_URL_REVOKE_MS)
  } catch (error) {
    win.close()
    throw error
  }
}