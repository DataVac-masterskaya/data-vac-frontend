import Link from 'next/link'
import { ArrowsIcon, Text } from '@datavac/ui-kit'
import type { IngredientWhereUsedProps } from './types'

const DEFAULT_LABEL = 'Где содержится'

export function IngredientWhereUsed({ href, label = DEFAULT_LABEL }: IngredientWhereUsedProps) {
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center justify-self-end gap-2 no-underline"
    >
      <Text size="sm" className="m-0 font-normal leading-5 text-fg-muted">
        {label}
      </Text>
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3F3F3] dark:bg-subtle"
        aria-hidden
      >
        <ArrowsIcon width={12} height={12} />
      </span>
    </Link>
  )
}
