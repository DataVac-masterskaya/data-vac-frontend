'use client';

import { VaccineInfoBlock } from '@/shared/ui/VaccineInfoBlock';

type Section = {
  title: string;
  content: string;
};

export type VaccineDetailScreenProcessedProps = {
  sections: Section[];
};

export function VaccineDetailScreenProcessed({ sections }: VaccineDetailScreenProcessedProps) {
  return (
    <div className="flex flex-col gap-8">
      {sections.map((section) => (
        <VaccineInfoBlock
          key={section.title}
          title={section.title}
          text={section.content}
        />
      ))}
    </div>
  );
}
