'use client'

import { AdministrationIcon, type AdministrationMethod } from '@datavac/ui-kit'

type AdministrationMethodIconsProps = {
  methods: AdministrationMethod[]
}

const MAX_ICONS = 5

export function AdministrationMethodIcons({ methods }: AdministrationMethodIconsProps) {
  const visibleMethods = methods.slice(0, MAX_ICONS)

  if (visibleMethods.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2.5">
      {visibleMethods.map((method, index) => (
        <AdministrationIcon key={`${method}-${index}`} method={method} />
      ))}
    </div>
  )
}
