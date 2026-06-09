'use client'

import Link from 'next/link'
import { ArrowsIcon, cn } from '@datavac/ui-kit'
import { useSummarySidebarMediaContext } from './summary-sidebar-media-context'
import { summaryValueTextClassName } from './use-summary-value-text'
import type { VaccineSummaryInfection } from './types'

type InfectionLinkRowProps = {
  infection: VaccineSummaryInfection
}

export function InfectionLinkRow({ infection }: InfectionLinkRowProps) {
  const { isDesktop } = useSummarySidebarMediaContext()
  const rowClassName = cn(
    'group items-center gap-2',
    isDesktop ? 'flex w-full justify-between' : 'inline-flex max-w-full',
    summaryValueTextClassName,
  )

  const chevron = (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-subtle text-fg-secondary transition-colors group-hover:bg-accent group-hover:text-white">
      <ArrowsIcon width={10} height={10} />
    </span>
  )

  if (!infection.href) {
    return (
      <li className={rowClassName}>
        <span className="min-w-0 truncate">{infection.name}</span>
        {chevron}
      </li>
    )
  }

  return (
    <li className={isDesktop ? 'w-full' : undefined}>
      <Link href={infection.href} className={cn(rowClassName, 'cursor-pointer')}>
        <span className="min-w-0 truncate">{infection.name}</span>
        {chevron}
      </Link>
    </li>
  )
}
