import { pdf } from '@react-pdf/renderer'
import QRCode from 'qrcode'
import { createElement } from 'react'
import { VaccinePdfDocument } from './vaccine-pdf-document'
import type { VaccinePdfData } from './vaccine-pdf.types'

function sanitizeFilename(name: string): string {
  return name
    .trim()
    .replace(/[^\p{L}\p{N}\-_ ]+/gu, '')
    .replace(/\s+/g, '-')
    .slice(0, 80) || 'vaccine'
}

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

  const filename = `${sanitizeFilename(data.officialName || data.name)}.pdf`
  const objectUrl = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = objectUrl
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()

  URL.revokeObjectURL(objectUrl)
}