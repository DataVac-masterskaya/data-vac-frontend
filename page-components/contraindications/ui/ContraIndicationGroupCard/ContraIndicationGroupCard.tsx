import { Fragment } from 'react';
import { ContraIndicationRow } from '../ContraIndicationRow';
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
      <h2 className="text-sm font-semibold text-fg w-[200px] md:w-[280px]">{title}</h2>

      <div className="mt-3 border-t border-subtle" />

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
