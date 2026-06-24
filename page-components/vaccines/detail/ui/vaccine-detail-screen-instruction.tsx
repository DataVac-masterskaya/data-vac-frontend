import type { VaccineInstructionSection } from './vaccine-detail-screen-instruction.types';
import { Heading, Text } from '@datavac/ui-kit';

type VaccineDetailScreenInstructionProps = {
  sections: VaccineInstructionSection[];
  className?: string;
};

export function VaccineDetailScreenInstruction({
  sections,
  className,
}: VaccineDetailScreenInstructionProps) {
  return (
    <article className={className}>
      <div className="rounded-2xl bg-card p-6">
        <div className="flex flex-col gap-[23px]">
          {sections.map((section) => (
            <section
              key={section.title}
              aria-labelledby={`instruction-section-${section.title}`}
            >
              <Heading
                as="h2"
                size="lg"
                id={`instruction-section-${section.title}`}
                className="font-medium leading-[22px] text-accent xl:text-[20px] xl:leading-6"
              >
                {section.title}
              </Heading>

              <Text size="sm" className="mt-[11px] leading-[18px] text-fg">
                {section.content}
              </Text>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
