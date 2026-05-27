/** Ширина блока таблицы: до 768 → 720px, 768–1279 → 1016px, от 1280 → 1312px */
export const INGREDIENT_TABLE_WIDTH_CLASS =
  'w-full max-w-[720px] md:max-w-[1016px] xl:max-w-[1312px]'

/** Общая сетка заголовка таблицы и строки IngredientCard (выравнивание колонок) */
export const INGREDIENT_ROW_GRID_CLASS =
  'grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-start gap-x-6'
