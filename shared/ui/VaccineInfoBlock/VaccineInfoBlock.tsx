
import { InfoCircleIcon } from '@datavac/ui-kit';

export type VaccineInfoBlockProps = {
  title: string;
  text: string;
};

export function VaccineInfoBlock({ title, text }: VaccineInfoBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[22px] font-medium text-[#E30C5C] leading-none">
        {title}
      </h3>
      <div className="flex items-center gap-1.5">
        <InfoCircleIcon width={20} height={20} className="text-[#FB9A40]" />
        <span className="text-base font-semibold text-[#323335]">
          {text}
        </span>
      </div>
    </div>
  );
}