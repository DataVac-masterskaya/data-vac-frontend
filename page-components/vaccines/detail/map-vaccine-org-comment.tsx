import type { ReactNode } from 'react'
import type { Vaccine } from '@/shared/types/api'

export function mapVaccineToOrgComment(vaccine: Vaccine): ReactNode | undefined {
  const text = vaccine.comment?.text
  if (!text) return undefined
  return <>{text}</>
}
