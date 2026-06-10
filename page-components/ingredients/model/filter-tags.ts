export const INGREDIENT_FILTER_TAGS = [
    'Адъювант',
    'Стабилизатор',
    'Консервант',
    'Подсластитель',
    'Эмульгатор',
    'Следы производства',
  ] as const
  
  export type IngredientFilterTag = (typeof INGREDIENT_FILTER_TAGS)[number]
