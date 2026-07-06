'use client';

import { type ReactNode } from 'react'
import { ArrowsIcon } from '@datavac/ui-kit'
import { BackLink } from '@/shared/ui/back-link'
import { Separator } from '@/shared/ui/separator'
import { resultsLabel } from '@/shared/lib/pluralize'

type ResultsHeaderProps = {
  title: string;
  count?: number;
  backHref?: string;
  onBack?: () => void;
  filters?: ReactNode;
  className?: string;
};

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="group flex items-center gap-2 text-fg w-fit"
      aria-label="Назад"
    >
      <div
        className="
          w-5 h-5
          flex items-center justify-center
          rounded-full
          bg-interactive
          text-fg
          transition-all
          group-hover:bg-accent
          group-hover:text-white
          shrink-0
        "
        aria-hidden="true"
      >
        <ArrowsIcon width={12} height={12} className="rotate-180" />
      </div>
      <span className="text-fg">Назад</span>
    </button>
  );
}

export function ResultsHeader({
  title,
  count,
  backHref = '/',
  onBack,
  filters,
  className,
}: ResultsHeaderProps) {
  return (
    <div className={className}>
      {onBack ? <BackButton onBack={onBack} /> : <BackLink href={backHref} />}

      {filters ? (
        <>
          <h1 className="pt-4 pb-4 text-2xl font-normal text-fg">{title}</h1>
          <div className="flex min-h-8 flex-wrap items-center justify-between gap-4">
            {filters}
            {count !== undefined && (
              <p className="shrink-0 text-xs font-normal text-fg-muted whitespace-nowrap">
                {resultsLabel(count)}
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-4">
          <h1 className="text-2xl font-normal text-fg">{title}</h1>
          {count !== undefined && (
            <p className="shrink-0 text-xs font-normal text-fg-muted whitespace-nowrap">
              {resultsLabel(count)}
            </p>
          )}
        </div>
      )}

      <Separator className="mt-4" />
    </div>
  );
}
