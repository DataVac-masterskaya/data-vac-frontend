'use client'

import {
  AdministrationIcon,
  Badge,
  type AdministrationMethod,
} from '@datavac/ui-kit'
import { useRoutesMaxVisible } from './use-routes-max-visible'

export const VACCINE_COUNT_BADGE_CLASS_NAME =
  'inline-flex h-4 min-w-[23px] shrink-0 items-center justify-center rounded-pill bg-subtle px-1 text-sm font-medium leading-none text-accent'

type VaccineRoutesCellProps = {
  routes: AdministrationMethod[]
}

export function VaccineRoutesCell({ routes }: VaccineRoutesCellProps) {
  const maxVisible = useRoutesMaxVisible()

  if (routes.length === 0) {
    return null
  }

  const extraRoutesCount = routes.length - maxVisible
  const visibleRoutes = routes.slice(0, maxVisible)

  return (
    <div className="flex items-start gap-1">
      {visibleRoutes.map((method, index) => {
        const isLastIcon = index === visibleRoutes.length - 1
        const needsRightPadding = isLastIcon && extraRoutesCount === 0

        return (
          <span
            key={`${method}-${index}`}
            className={`inline-flex shrink-0 pt-1${needsRightPadding ? ' pr-1' : ''}`}
          >
            <AdministrationIcon method={method} className="size-10 shrink-0" />
          </span>
        )
      })}
      {extraRoutesCount > 0 && (
        <Badge className={VACCINE_COUNT_BADGE_CLASS_NAME}>
          +{extraRoutesCount}
        </Badge>
      )}
    </div>
  )
}
