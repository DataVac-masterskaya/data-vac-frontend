export function ProcessedSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-medium text-accent leading-none md:text-[22px]">
      {children}
    </h2>
  )
}
