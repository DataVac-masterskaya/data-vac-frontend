import { ArrowsIcon } from '@datavac/ui-kit';

export type CircleArrowProps = {
  isActive?: boolean;
};

export function CircleArrow({ isActive = false }: CircleArrowProps) {
  return (
    <span
      className={`flex size-5 shrink-0 items-center justify-center rounded-full transition-colors ${
        isActive
          ? 'bg-accent text-[color:var(--color-interactive)]'
          : 'bg-subtle text-fg group-hover:bg-accent group-hover:text-[color:var(--color-interactive)]'
      }`}
      aria-hidden
    >
      <ArrowsIcon
        width={12}
        height={12}
        className="size-3 shrink-0"
        aria-hidden
      />
    </span>
  );
}
