import type { ReactNode } from 'react'
import { ProcessedSectionTitle } from './processed-section-title'

export function ProcessedOrgComment({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <ProcessedSectionTitle>Комментарий АНО «Коллективный иммунитет»</ProcessedSectionTitle>
      <p className="text-base text-fg">{children}</p>
    </div>
  )
}
