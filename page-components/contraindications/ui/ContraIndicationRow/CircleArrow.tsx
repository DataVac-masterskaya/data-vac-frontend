import { ArrowsIcon } from '@datavac/ui-kit';

export type CircleArrowProps = {
  isActive?: boolean;
};

export function CircleArrow({ isActive = false }: CircleArrowProps) {
  return (
    <span
      className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
        isActive ? 'bg-[#E30C5C] text-white' : 'bg-[#F3F3F3] text-[#323335]'
      }`}
      aria-hidden
    >
      <ArrowsIcon width={12} height={12} className="size-3 shrink-0" aria-hidden />
    </span>
  );
}