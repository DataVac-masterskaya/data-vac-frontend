
import { InfoCircleIcon } from '@datavac/ui-kit';

export type VaccineInfoBlockProps = {
  title: string;
  text: string;
};

export function VaccineInfoBlock({ title, text }: VaccineInfoBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-accent leading-none dark:text-fg md:text-[22px]">
        {title}
      </h3>
      <div className="flex items-center gap-1.5">
        <InfoCircleIcon width={20} height={20} className="text-[#FB9A40]" />
        <span className="text-base font-semibold text-fg">
          {text}
        </span>
      </div>
    </div>
  );
}
