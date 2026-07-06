export function ProcessedSectionNote({ children }: { children?: string }) {
  if (!children) return null

  return <p className="whitespace-pre-line text-sm italic text-fg-muted">{children}</p>
}
