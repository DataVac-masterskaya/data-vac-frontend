import { Text, ArrowsIcon } from "@datavac/ui-kit";

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
      className={`
        py-[11px] 
        px-[12px] 
        w-full 
        grid 
        grid-cols-[1fr_1fr_20px] 
        xl:grid-cols-[1fr_231px_20px] 
        gap-[13px] 
        rounded-input 
        text-left 
        bg-card 
        cursor-pointer 
        ${className || ""}`}
      onClick={onClick}
    >
      <Text
        size="sm"
        className="
          overflow-hidden
          text-ellipsis
          line-clamp-2
          md:whitespace-nowrap
          2xl:text-base!
          max-w-[344px]
        "
      >
        {name}
      </Text>
      <Text
        size="sm"
        className="text-[#A6A6A6] 2xl:text-base! 2xl:max-w-[231px] ml-[7px]"
      >
        {category}
      </Text>
      <span
        className={`
          rounded-full 
          size-[20px] 
          self-center 
          justify-self-end 
          flex 
          items-center 
          justify-center 
          ${isActive ? "bg-accent" : "bg-subtle"}`}
      >
        <ArrowsIcon />
      </span>
    </button>
  );
};
