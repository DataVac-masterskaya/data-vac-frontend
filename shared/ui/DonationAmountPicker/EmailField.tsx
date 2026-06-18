import { cn, Input } from "@datavac/ui-kit";

type EmailFieldProps = {
  value: string
  error: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
}

export function EmailField({ value, error, onChange, onBlur }: EmailFieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="email" className="sr-only">Email</label>
      <Input
        id="email"
        type="email"
        placeholder="Ваш e-mail"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        variant={'white'}
        className={cn(
          'min-w-[288px] w-full py-4.25 px-4 font-normal leading-[1.37] border-transparent placeholder:text-fg-secondary focus:border-transparent hover:placeholder:text-fg',
          {'border-accent': error}
        )}
      />
      <div className="ml-4 min-h-4">
        {error && <p className="text-accent text-xs">{error}</p>}
      </div>
    </div>
  );
}
