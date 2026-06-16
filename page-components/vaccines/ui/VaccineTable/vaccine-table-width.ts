import type { VaccineTableLayout } from './use-vaccine-table-media'

/** Figma: tablet/mobile 720; desktop 1016 (1024–1279); desktop wide 1312 (≥1280). */
export const VACCINE_TABLE_MAX_WIDTH_PX = {
  narrow: 720,
  desktop: 1016,
  desktopWide: 1312,
} as const

export function getVaccineTableMaxWidthPx(
  layout: VaccineTableLayout,
  isWideDesktop: boolean,
): number {
  if (layout === 'desktop') {
    return isWideDesktop
      ? VACCINE_TABLE_MAX_WIDTH_PX.desktopWide
      : VACCINE_TABLE_MAX_WIDTH_PX.desktop
  }

  return VACCINE_TABLE_MAX_WIDTH_PX.narrow
}
