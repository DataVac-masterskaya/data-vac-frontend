import { cn } from "@datavac/ui-kit";

type PresetButtonProps = {
  sum: number
  popular?: boolean
  isSelected: boolean
  onClick: () => void
}

export function PresetButton({ sum, popular, isSelected, onClick }: PresetButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-5 w-full rounded-xl flex items-center justify-center ${
        popular ? 'bg-neutral pt-5 pb-1' : 'bg-page'
      }`}
    >
      <div className={popular ? 'flex flex-col' : ''}>
        <span
          className={cn(
            'text-xl font-semibold leading-[1.2] hover:text-accent-hover',
            {
              'text-white': popular,
              'text-fg': !popular && !isSelected,
              'text-accent': isSelected,
            }
          )}
        >
          {sum.toLocaleString('ru-RU')}₽
        </span>
        {popular && (
          <span className="text-xs font-regular leading-[1.3] text-white/50">
            Популярный
          </span>
        )}
      </div>
    </button>
  );
}
