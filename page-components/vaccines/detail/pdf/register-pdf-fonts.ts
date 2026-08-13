import { Font } from '@react-pdf/renderer'
import { PDF_FONT_BOLD, PDF_FONT_REGULAR } from './pdf-assets'

let registered = false

/** Registers Inter Tight for @react-pdf (Cyrillic + Latin). Safe to call multiple times. */
export function registerPdfFonts() {
  if (registered || typeof window === 'undefined') return

  const origin = window.location.origin

  Font.register({
    family: 'Inter Tight',
    fonts: [
      {
        src: `${origin}${PDF_FONT_REGULAR}`,
        fontWeight: 400,
      },
      {
        src: `${origin}${PDF_FONT_BOLD}`,
        fontWeight: 700,
      },
    ],
  })

  registered = true
}
