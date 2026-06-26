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
        <div className="flex flex-col gap-6">
          {sections.map((section) => {
            const sectionId = `instruction-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`;

            const contentParts = Array.isArray(section.content)
              ? section.content
              : section.content
                  .split('\n')
                  .map((item) => item.trim())
                  .filter(Boolean);

            return (
              <section key={section.title} aria-labelledby={sectionId}>
                <Heading
                  as="h2"
                  size="lg"
                  id={sectionId}
                  className="font-medium leading-snug text-accent xl:text-xl xl:leading-6"
                >
                  {section.title}
                </Heading>

                {section.isList ? (
                  <ul className="mt-3 list-disc pl-6 text-fg">
                    {contentParts.map((item, index) => (
                      <li key={`${section.title}-${index}`}>
                        <Text size="sm">{item}</Text>
                      </li>
                    ))}
                  </ul>
                ) : contentParts.length === 1 ? (
                  <Text size="sm" className="mt-3 text-fg">
                    {contentParts[0]}
                  </Text>
                ) : (
                  <div className="mt-3 flex flex-col gap-2">
                    {contentParts.map((paragraph, index) => (
                      <Text
                        key={`${section.title}-${index}`}
                        size="sm"
                        className="text-fg"
                      >
                        {paragraph}
                      </Text>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
