import { Input } from "@datavac/ui-kit";

type CustomAmountInputProps = {
  value: string
  displayValue: string
  isFocused: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
}

export function CustomAmountInput({
  value,
  displayValue,
  isFocused,
  onChange,
  onFocus,
  onBlur,
}: CustomAmountInputProps) {
  return (
    <div className="col-span-full">
      <label htmlFor="custom-amount" className="sr-only">Другая сумма</label>
      <Input
        id="custom-amount"
        type="text"
        inputMode="numeric"
        placeholder="Другая сумма"
        value={isFocused ? value : displayValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        variant={'grey'}
        className="w-full bg-page text-[22px] font-medium leading-[1.27] text-center text-accent placeholder:text-fg-muted focus:outline-none"
      />
    </div>
  );
}
