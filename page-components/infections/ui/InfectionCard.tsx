import { Text, ArrowsIcon, cn } from "@datavac/ui-kit";

type InfectionCardProps = {
  name: string;
  category: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
};

export const InfectionCard = ({
  name,
  category,
  isActive,
  onClick,
  className,
}: InfectionCardProps) => {
  return (
    <button
      aria-pressed={isActive}
      aria-label={`${name}, категория ${category}${isActive ? ", выбрано" : ""}`}
      className={cn(
        "py-[11px] px-[12px] w-full h-full grid grid-cols-[1fr_1fr_20px]",
        "xl:grid-cols-[1fr_231px_20px] gap-[13px] rounded-input text-left",
        "bg-card cursor-pointer group", className
      )}
      onClick={onClick}
    >
      <Text
        size="sm"
        className="
          line-clamp-2
          2xl:text-base!
          max-w-[344px]
        "
      >
        {name}
      </Text>
      <Text
        size="sm"
        className="text-fg-muted 2xl:text-base! 2xl:max-w-[231px] ml-[7px]"
      >
        {category}
      </Text>
      <span
        className={cn(
          "rounded-full size-[20px] self-center justify-self-end flex", 
          "items-center transition-colors justify-center", 
          "group-hover:bg-accent group-hover:text-[color:var(--color-interactive)]",
          isActive ? "bg-accent text-[color:var(--color-interactive)]" : "bg-subtle text-fg",
        )}
      >
        <ArrowsIcon width={12} height={12} />
      </span>
    </button>
  );
};
