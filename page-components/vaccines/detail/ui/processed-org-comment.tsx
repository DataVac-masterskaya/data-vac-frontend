import type { ReactNode } from 'react'
import { ProcessedSectionTitle } from './processed-section-title'

export function ProcessedOrgComment({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 -mx-4 -mb-4 flex flex-col gap-3 rounded-[16px] bg-subtle p-4">
      <ProcessedSectionTitle>Комментарий АНО «Коллективный иммунитет»</ProcessedSectionTitle>
      <p className="text-base text-fg">{children}</p>
    </div>
  )
}
