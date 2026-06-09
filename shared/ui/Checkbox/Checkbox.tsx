import { cn } from "@datavac/ui-kit"
import { useId } from "react"

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: React.ReactNode
  id?: string
  className?: string
}

export function Checkbox ({
  checked,
  onChange,
  label,
  id,
  className
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={`flex items-center gap-x-[10px] cursor-pointer select-none group`}
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div
          className={
            cn(
              "w-[15px] h-[15px] border-[1.5px] rounded flex items-center justify-center transition-all duration-200",
              "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2",
              checked
                ? "bg-fg border-fg"
                : "bg-interactive border-fg-muted group-hover:border-accent",
              className
          )}
        >
          <svg
            className={`
              w-3.5 h-3.5 text-white transition-transform duration-200
              ${checked ? 'scale-100' : 'scale-0'}
            `}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <span className="text-sm font-regular text-fg transition-colors">
        {label}
      </span>
    </label>
  )
}
