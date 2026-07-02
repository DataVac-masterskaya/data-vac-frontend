'use client';

import { ArrowsIcon } from '@datavac/ui-kit'

type SearchResultsHeaderProps = {
  query: string;
  count: number;
  onBack: () => void;
};

function pluralizeResults(count: number): string {
  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'результатов';
  }
  const lastDigit = count % 10;
  if (lastDigit === 1) {
    return 'результат';
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'результата';
  }
  return 'результатов';
}

export function SearchResultsHeader({ query, count, onBack }: SearchResultsHeaderProps) {
  return (
    <div>
      <div className="flex flex-col gap-4">
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl text-fg font-normal">
            {query}
          </h1>
          <div className="text-sm text-fg-secondary whitespace-nowrap">
            {count} {pluralizeResults(count)}
          </div>
        </div>
      </div>
      <hr className="mt-4 border-t border-border"/>
    </div>
  );
}
