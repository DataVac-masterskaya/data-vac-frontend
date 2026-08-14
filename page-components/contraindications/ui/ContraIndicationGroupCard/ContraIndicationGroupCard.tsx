import Link from 'next/link';
import { Fragment } from 'react';
import { CircleArrow } from '../ContraIndicationRow/CircleArrow';
import { ContraIndicationGroupCardProps } from './ContraIndicationGroupCard.types';

export function ContraIndicationGroupCard({
  title,
  groups,
  className,
}: ContraIndicationGroupCardProps) {
  return (
    <section
      className={`rounded-xl bg-card px-3 py-[11px]${className ? ` ${className}` : ''}`}
    >
      <h2 className="text-sm font-semibold text-fg">{title}</h2>

      <div className="mt-3 border-t border-subtle" />

      <div className="mt-[13px] flex flex-col gap-[13px]">
        {groups.map((group, groupIndex) => (
          <Fragment key={group.category}>
            <div className="flex flex-col sm:flex-row sm:gap-5 sm:items-start">
              <span className="mb-2 shrink-0 truncate text-sm text-fg-muted sm:mb-0 sm:w-[200px] md:w-[280px]">
                {group.category}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                {group.items.map((item, itemIndex) => {
                  const arrow = <CircleArrow isActive={item.isActive} />;
                  return (
                    <div
                      key={`${group.category}-${item.text}-${itemIndex}`}
                      className="group flex items-center justify-between gap-2"
                    >
                      <span className="text-sm text-fg">{item.text}</span>
                      {item.href ? (
                        <Link href={item.href} aria-label="Перейти">
                          {arrow}
                        </Link>
                      ) : (
                        arrow
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {groupIndex < groups.length - 1 && (
              <div className="border-t border-subtle" />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
