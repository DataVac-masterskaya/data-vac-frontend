'use client';

import { cn } from '@datavac/ui-kit';
import { ContraIndicationRowProps } from './ContraIndicationRow.types';
import { CircleArrow } from './CircleArrow';

export function ContraIndicationRow({
  category,
  text,
  isActive = false,
  linkText,
  onLinkClick,
  className,
}: ContraIndicationRowProps) {
  return (
    <div
      className={cn(
        'group grid grid-cols-1 gap-3 rounded-xl bg-card px-3 py-[11px]',
        'sm:grid-cols-[200px_minmax(0,1fr)_auto] sm:items-center sm:gap-5',
        'md:grid-cols-[280px_minmax(0,1fr)_auto]',
        className,
      )}
    >
      <span className="block truncate text-sm text-fg-muted">{category}</span>

      <span className="block min-w-0 text-sm text-fg">{text}</span>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        {linkText && (
          <button
            type="button"
            onClick={onLinkClick}
            className="text-sm text-fg-muted"
          >
            {linkText}
          </button>
        )}

        <CircleArrow isActive={isActive} />
      </div>
    </div>
  );
}
