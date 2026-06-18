import Link from 'next/link'
import { ArrowsIcon, Text } from '@datavac/ui-kit'

type Props = {
  href: string
}

export function IngredientWhereUsed({ href }: Props) {
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center gap-2 no-underline"
    >
      <Text size="sm" className="m-0 font-normal leading-5 text-fg-muted">
        Где содержится
      </Text>
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-subtle"
        aria-hidden
      >
        <ArrowsIcon width={12} height={12} />
      </span>
    </Link>
  )
}
