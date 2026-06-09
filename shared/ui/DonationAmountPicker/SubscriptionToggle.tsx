import { Switch } from "@datavac/ui-kit";

type SubscriptionToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function SubscriptionToggle({ checked, onChange }: SubscriptionToggleProps) {
  return (
    <div className="flex gap-x-3 pt-4.25">
      <Switch
        checked={checked}
        onChange={onChange}
        size={'sm'}
        trackClassName={checked ? 'bg-accent' : 'bg-white'}
        thumbClassName={checked ? 'bg-white' : 'bg-accent dark:bg-neutral'}
        aria-label={checked ? 'Отключить поле email' : 'Включить поле email'}
      />
      <p>Переводить ежемесячно</p>
    </div>
  );
}
