'use client';

import Link from 'next/link';
import { cn } from '@datavac/ui-kit';
import { ContraIndicationRowProps } from './ContraIndicationRow.types';
import { CircleArrow } from './CircleArrow';

export function ContraIndicationRow({
  category,
  text,
  isActive = false,
  linkText,
  onLinkClick,
  href,
  className,
}: ContraIndicationRowProps) {
  return (
    <div
      className={cn(
        'group grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1 rounded-xl bg-card px-3 py-[11px]',
        'sm:grid-cols-[200px_minmax(0,1fr)_auto] sm:gap-5',
        'md:grid-cols-[280px_minmax(0,1fr)_auto]',
        className,
      )}
    >
      <span className="col-span-2 block truncate text-sm text-fg-muted sm:col-span-1">{category}</span>

      <span className="block min-w-0 text-sm text-fg">{text}</span>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        {linkText && (
          href ? (
            <Link href={href} className="text-sm text-fg-muted">
              {linkText}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onLinkClick}
              className="text-sm text-fg-muted"
            >
              {linkText}
            </button>
          )
        )}

        {href && !linkText ? (
          <Link href={href} aria-label="Перейти">
            <CircleArrow isActive={isActive} />
          </Link>
        ) : (
          <CircleArrow isActive={isActive} />
        )}
      </div>
    </div>
  );
}
