export type SeparatorProps = {
  className?: string
}

export function Separator({ className }: SeparatorProps) {
  return (
    <hr
      className={['border-0 border-t border-border', className].filter(Boolean).join(' ')}
      aria-hidden
    />
  )
}
