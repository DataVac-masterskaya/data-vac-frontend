import { Text } from '@datavac/ui-kit'
import type { IngredientNameCellProps } from './types'

export function IngredientNameCell({ name }: IngredientNameCellProps) {
  return (
    <Text
      size="sm"
      className="m-0 min-w-0 break-words text-base font-semibold leading-5 text-fg"
    >
      {name}
    </Text>
  )
}
