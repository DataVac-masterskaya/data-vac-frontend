import { fetchIngredients } from '@/shared/api/ingredients'
import { BackLink } from '@/shared/ui/back-link'
import { sideMenuFont } from '@/shared/ui/SideMenu/side-menu-font'
import {
  INGREDIENT_TABLE_WIDTH_CLASS,
  IngredientCard,
  IngredientTableHeader,
} from './ui/ingredient-card'

const FILTER_TYPES = [
  'Адъювант',
  'Консервант',
  'Инактиватор',
  'Стабилизатор',
  'Субстрат',
  'Антибиотик',
] as const

function filterChipClass(isActive: boolean) {
  return [
    'inline-flex h-8 items-center rounded-full px-3 text-sm font-normal transition-colors whitespace-nowrap',
    isActive
      ? 'bg-neutral text-white'
      : 'bg-card text-fg hover:text-accent',
  ].join(' ')
}

function resultsLabel(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return `${count} результат`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} результата`
  }
  return `${count} результатов`
}

export default async function IngredientsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const { results } = await fetchIngredients({
    sort: 'popularity',
    type: type || undefined,
  })

  return (
    <div className="flex flex-col">
      <BackLink href="/" />

      <h1
        className={`${sideMenuFont.className} pt-4 pb-4 text-2xl font-normal text-fg`}
      >
        Компоненты
      </h1>

      <div className="flex min-h-8 flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <a href="/ingredients" className={filterChipClass(!type)}>
            Все
          </a>
          {FILTER_TYPES.map((t) => (
            <a
              key={t}
              href={`/ingredients?type=${encodeURIComponent(t)}`}
              className={filterChipClass(type === t)}
            >
              {t}
            </a>
          ))}
        </div>
        <p className="shrink-0 text-xs font-normal text-fg-muted">{resultsLabel(results.length)}</p>
      </div>

      <hr className="mt-4 border-0 border-t border-border" />

      <div className={INGREDIENT_TABLE_WIDTH_CLASS}>
        <IngredientTableHeader className="mt-4" />

        <ul className="flex flex-col gap-1">
          {results.map((ingredient) => (
            <li key={ingredient.id}>
              <IngredientCard ingredient={ingredient} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
