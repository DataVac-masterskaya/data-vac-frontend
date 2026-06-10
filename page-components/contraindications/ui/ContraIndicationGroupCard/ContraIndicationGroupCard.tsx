'use client';

import { Fragment } from 'react';
import { cn } from '@datavac/ui-kit';
import { ContraIndicationRow } from '../ContraIndicationRow';
import { ContraIndicationGroupCardProps } from './ContraIndicationGroupCard.types';

export function ContraIndicationGroupCard({
  title,
  groups,
  className,
}: ContraIndicationGroupCardProps) {
  return (
    <section className={cn('rounded-xl bg-card px-3 py-[11px]', className)}>
      <h2 className="text-sm font-semibold text-fg">{title}</h2>

      <div className="mt- border-t border-subtle" />

      <div className="mt-[13px] flex flex-col gap-[13px]">
        {groups.map((group, groupIndex) => (
          <Fragment key={group.category}>
            <div className="flex flex-col gap-2">
              {group.items.map((item, itemIndex) => (
                <ContraIndicationRow
                  key={`${group.category}-${item.text}-${itemIndex}`}
                  category={group.category}
                  text={item.text}
                  isActive={item.isActive}
                  linkText={item.linkText}
                  onLinkClick={item.onClick}
                  className="bg-transparent px-0 py-0"
                />
              ))}
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
