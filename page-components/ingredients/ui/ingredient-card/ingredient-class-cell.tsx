import { Text } from '@datavac/ui-kit'
import type { IngredientClassCellProps } from './types'

export function IngredientClassCell({ ingredientClass }: IngredientClassCellProps) {
  return (
    <Text
      size="sm"
      className="m-0 min-w-0 break-words text-base font-normal leading-5 text-fg"
    >
      {ingredientClass}
    </Text>
  )
}
