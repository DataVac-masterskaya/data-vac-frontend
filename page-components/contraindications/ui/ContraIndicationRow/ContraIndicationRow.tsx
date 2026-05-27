'use client';

import { ContraIndicationRowProps } from './ContraIndicationRow.types';
import { CircleArrow } from './CircleArrow';

export function ContraIndicationRow({
  category,
  text,
  isActive = false,
  linkText,
  onClick,
  onLinkClick,
  className,
}: ContraIndicationRowProps) {
  return (
    <div
      className={`
        grid grid-cols-1 gap-3 rounded-xl bg-white px-3 py-2.75
        sm:grid-cols-[200px_minmax(0,1fr)_auto] sm:items-center sm:gap-5
        md:grid-cols-[280px_minmax(0,1fr)_auto]
        ${className ?? ''}
      `}
      onClick={onClick}
    >
      <span className="block truncate text-sm text-[#A6A6A6]">
        {category}
      </span>

      <span className="block min-w-0 text-sm text-[#323335]">
        {text}
      </span>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        {linkText && (
          <button
            type="button"
            onClick={onLinkClick}
            className="text-sm text-[#A6A6A6]"
          >
            {linkText}
          </button>
        )}

        <CircleArrow isActive={isActive} />
      </div>
    </div>
  );
}