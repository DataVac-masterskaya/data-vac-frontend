export const INGREDIENT_FILTER_ALL_TAG = 'Все' as const

export const INGREDIENT_CATEGORY_TAGS = [
  'Адъювант',
  'Стабилизатор',
  'Консервант',
  'Подсластитель',
  'Эмульгатор',
  'Следы производства',
] as const

export const INGREDIENT_FILTER_TAGS = [
  INGREDIENT_FILTER_ALL_TAG,
  ...INGREDIENT_CATEGORY_TAGS,
] as const

export type IngredientCategoryTag = (typeof INGREDIENT_CATEGORY_TAGS)[number]
export type IngredientFilterTag = (typeof INGREDIENT_FILTER_TAGS)[number]
