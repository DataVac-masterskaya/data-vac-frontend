import type { ReactNode } from 'react'
import { cn } from '@datavac/ui-kit'
import { SectionDivider } from '@/shared/ui/SectionDivider'

type SummarySectionProps = {
  label: string
  children: ReactNode
  labelClassName?: string
}

export function SummarySection({ label, children, labelClassName }: SummarySectionProps) {
  return (
    <section>
      <h2
        className={cn(
          'text-xs font-normal leading-4 text-fg-secondary xl:text-[14px]',
          labelClassName ?? 'mb-2',
        )}
      >
        {label}
      </h2>
      {children}
    </section>
  )
}

type SummaryDividerProps = {
  className?: string
  marginClassName?: string
}

export function SummaryDivider({ className, marginClassName }: SummaryDividerProps = {}) {
  return <SectionDivider className={className} marginClassName={marginClassName} />
}
