'use client'

import Link from 'next/link'
import { ChevronDownIcon, InfoCircleIcon, Tooltip } from '@datavac/ui-kit'
import type { ProcessedLinkItem } from './vaccine-detail-screen-processed.types'

export function ProcessedLinkRow({ label, href, note }: ProcessedLinkItem) {
  const content = (
    <span className="flex items-center gap-1.5 text-base text-fg">
      <span>{label}</span>
      {note && (
        <Tooltip content={note}>
          <InfoCircleIcon width={16} height={16} className="text-accent" />
        </Tooltip>
      )}
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-subtle">
        <ChevronDownIcon width={12} height={12} className="-rotate-90 text-fg-muted" />
      </span>
    </span>
  )

  if (!href) return content

  return (
    <Link href={href} className="w-fit transition-opacity hover:opacity-70">
      {content}
    </Link>
  )
}
