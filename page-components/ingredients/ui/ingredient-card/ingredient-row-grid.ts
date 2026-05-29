/** Ширина блока таблицы: до 768 → 720px, 768–1279 → 1016px, от 1280 → 1312px */
export const INGREDIENT_TABLE_WIDTH_CLASS =
  'w-full max-w-[720px] md:max-w-[1016px] xl:max-w-[1312px]'

/** Общая сетка таблицы: заголовок и строки — прямые участники одной grid */
export const INGREDIENT_TABLE_GRID_CLASS =
  'grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(11rem,max-content)] items-start gap-x-4 gap-y-1 md:gap-x-6'

/** Строка в subgrid родителя (без оформления карточки) */
export const INGREDIENT_TABLE_ROW_SUBGRID_CLASS = 'col-span-3 grid grid-cols-subgrid'

/** Строка данных с карточкой */
export const INGREDIENT_TABLE_ROW_CLASS = `${INGREDIENT_TABLE_ROW_SUBGRID_CLASS} rounded-xl bg-card px-3 py-[11px]`
