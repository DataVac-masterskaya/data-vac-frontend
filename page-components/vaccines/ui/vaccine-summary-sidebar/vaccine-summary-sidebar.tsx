'use client'

import { cn } from '@datavac/ui-kit'
import { SummaryActions } from './summary-actions'
import { SummaryDivider } from './summary-section'
import {
  AgeAndPregnancySection,
  AgeSection,
  InfectionsSection,
  MethodsSection,
  PregnancySection,
  type SummaryContentProps,
} from './summary-sections'
import type { VaccineSummarySidebarProps } from './types'
import { useSummarySidebarMediaContext } from './summary-sidebar-media-context'

const COMPACT_PREGNANCY_LABEL = 'При беременности и ГВ'

export function VaccineSummarySidebar({
  infections,
  pregnancyLabel,
  showPregnancyWarning,
  ageLabel,
  administrationMethods,
  className,
}: VaccineSummarySidebarProps) {
  const { isDesktop, isTablet, isMobile } = useSummarySidebarMediaContext()

  const content: SummaryContentProps = {
    infections,
    pregnancyLabel,
    showPregnancyWarning,
    ageLabel,
    administrationMethods,
  }

  const card = (
    <>
      <div className={isTablet ? 'min-w-0 flex-1' : undefined}>
        <InfectionsSection infections={content.infections} spacing={isMobile ? 'mobile' : 'default'} />
      </div>

      {isDesktop ? (
        <>
          <SummaryDivider />

          <PregnancySection
            pregnancyLabel={content.pregnancyLabel}
            showPregnancyWarning={content.showPregnancyWarning}
          />

          <SummaryDivider />

          <AgeSection ageLabel={content.ageLabel} />

          <SummaryDivider />

          <MethodsSection administrationMethods={content.administrationMethods} />

          <SummaryDivider marginClassName="mt-[31px] mb-4 summary-wide:mt-[46px]" />

          <SummaryActions />
        </>
      ) : isTablet ? (
        <>
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <AgeAndPregnancySection
              ageLabel={content.ageLabel}
              pregnancyLabel={content.pregnancyLabel}
              showPregnancyWarning={content.showPregnancyWarning}
            />
          </div>
          <div className="min-w-0 flex-[1.15]">
            <MethodsSection
              administrationMethods={content.administrationMethods}
              label="Способ введения"
            />
          </div>
        </>
      ) : (
        <>
          <AgeSection ageLabel={content.ageLabel} spacing="mobile" />
          <PregnancySection
            pregnancyLabel={content.pregnancyLabel}
            showPregnancyWarning={content.showPregnancyWarning}
            label={COMPACT_PREGNANCY_LABEL}
            spacing="mobile"
          />
          <MethodsSection
            administrationMethods={content.administrationMethods}
            label="Способ введения"
            spacing="mobile"
          />
        </>
      )}
    </>
  )

  if (isDesktop) {
    return (
      <div className="sticky top-6 self-start w-full">
        <aside className={cn('flex flex-col rounded-[16px] bg-card p-4 w-full', className)}>
          {card}
        </aside>
      </div>
    )
  }

  return (
    <aside
      className={cn(
        'rounded-[16px] bg-card w-full p-3',
        isTablet && 'flex flex-row items-stretch gap-5',
        isMobile && 'flex flex-col gap-5',
        className,
      )}
    >
      {card}
    </aside>
  )
}
