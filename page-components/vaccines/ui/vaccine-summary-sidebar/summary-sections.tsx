'use client'

import { InfoCircleIcon } from '@datavac/ui-kit'
import { AdministrationMethodIcons } from './administration-method-icons'
import { InfectionLinkRow } from './infection-link-row'
import { SummarySection } from './summary-section'
import { summaryValueTextClassName } from './use-summary-value-text'
import type { VaccineSummarySidebarProps } from './types'

const compactValueTextClassName = 'font-normal text-fg text-[14px] leading-5'

export type SummaryContentProps = Pick<
  VaccineSummarySidebarProps,
  'infections' | 'pregnancyLabel' | 'showPregnancyWarning' | 'ageLabel' | 'administrationMethods'
>

export type SummarySectionSpacing = 'mobile' | 'default'

const HEADING_TO_CONTENT_MB = {
  mobile: 'mb-2',
  default: 'mb-2',
} as const

const INFECTIONS_HEADING_MB = {
  mobile: 'mb-3',
  default: 'mb-3',
} as const

export function InfectionsSection({
  infections,
  spacing = 'default',
}: Pick<SummaryContentProps, 'infections'> & { spacing?: SummarySectionSpacing }) {
  return (
    <SummarySection label="Инфекции" labelClassName={INFECTIONS_HEADING_MB[spacing]}>
      <ul className="flex flex-col gap-2">
        {infections.map((infection) => (
          <InfectionLinkRow key={infection.name} infection={infection} />
        ))}
      </ul>
    </SummarySection>
  )
}

type PregnancySectionProps = Pick<SummaryContentProps, 'pregnancyLabel' | 'showPregnancyWarning'> & {
  label?: string
  spacing?: SummarySectionSpacing
}

export function PregnancySection({
  pregnancyLabel,
  showPregnancyWarning,
  label = 'Применение при беременности и грудном вскармливании',
  spacing = 'default',
}: PregnancySectionProps) {
  return (
    <SummarySection label={label} labelClassName={HEADING_TO_CONTENT_MB[spacing]}>
      <div className="flex items-center gap-1.5">
        {showPregnancyWarning ? (
          <InfoCircleIcon width={20} height={20} className="shrink-0 text-warning" />
        ) : null}
        <span className={summaryValueTextClassName}>{pregnancyLabel}</span>
      </div>
    </SummarySection>
  )
}

export function AgeSection({
  ageLabel,
  spacing = 'default',
}: Pick<SummaryContentProps, 'ageLabel'> & { spacing?: SummarySectionSpacing }) {
  return (
    <SummarySection label="Допустимый возраст" labelClassName={HEADING_TO_CONTENT_MB[spacing]}>
      <p className={summaryValueTextClassName}>{ageLabel}</p>
    </SummarySection>
  )
}

export function AgeAndPregnancySection({
  ageLabel,
  pregnancyLabel,
  showPregnancyWarning,
}: Pick<SummaryContentProps, 'ageLabel' | 'pregnancyLabel' | 'showPregnancyWarning'>) {
  return (
    <>
      <div>
        <h2 className="mb-2 text-xs font-normal leading-4 text-fg-secondary">Допустимый возраст</h2>
        <p className={compactValueTextClassName}>{ageLabel}</p>
      </div>
      <div>
        <h2 className="mb-2 text-xs font-normal leading-4 text-fg-secondary">При беременности и ГВ</h2>
        <div className="flex items-center gap-1.5">
          {showPregnancyWarning ? (
            <InfoCircleIcon width={20} height={20} className="shrink-0 text-warning" />
          ) : null}
          <span className={compactValueTextClassName}>{pregnancyLabel}</span>
        </div>
      </div>
    </>
  )
}

type MethodsSectionProps = Pick<SummaryContentProps, 'administrationMethods'> & {
  label?: string
  spacing?: SummarySectionSpacing
}

function getMethodsHeadingMargin(label: string, spacing: SummarySectionSpacing): string {
  if (spacing === 'mobile') return 'mb-2'
  return label === 'Способ введения' ? 'mb-2' : 'mb-3'
}

export function MethodsSection({
  administrationMethods,
  label = 'Способы введения',
  spacing = 'default',
}: MethodsSectionProps) {
  return (
    <SummarySection label={label} labelClassName={getMethodsHeadingMargin(label, spacing)}>
      <AdministrationMethodIcons methods={administrationMethods} />
    </SummarySection>
  )
}
