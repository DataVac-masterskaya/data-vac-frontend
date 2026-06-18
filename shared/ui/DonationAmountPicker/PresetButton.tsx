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
        isSelected ? 'bg-neutral' : 'bg-subtle'
      } ${popular ? 'pt-5 pb-1' : ''}`}
    >
      <div className={popular ? 'flex flex-col' : ''}>
        <span
          className={cn(
            'text-xl font-semibold leading-[1.2] hover:text-accent-hover',
            {
              'text-white': isSelected,
              'text-accent': popular && !isSelected,
              'text-fg hover:text-accent': !popular && !isSelected,
            }
          )}
        >
          {sum.toLocaleString('ru-RU')}₽
        </span>
        {popular && (
          <span
            className={`text-xs font-normal leading-[1.3] ${
              isSelected ? 'text-white/50' : 'text-fg-muted'
            }`}
          >
            Популярный
          </span>
        )}
      </div>
    </button>
  );
}
