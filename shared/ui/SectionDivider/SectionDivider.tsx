import { cn } from '@datavac/ui-kit'

type SectionDividerProps = {
  className?: string
  marginClassName?: string
}

export function SectionDivider({
  className,
  marginClassName = 'my-4',
}: SectionDividerProps = {}) {
  return <hr className={cn('border-0 border-t border-border', marginClassName, className)} />
}
