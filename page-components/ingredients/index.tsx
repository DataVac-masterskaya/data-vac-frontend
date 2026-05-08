import { fetchIngredients } from '@/shared/api/ingredients'

export default async function IngredientsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const { results, count } = await fetchIngredients({
    sort: 'popularity',
    type: type || undefined,
  })

  const allTypes = ['Адъювант', 'Консервант', 'Инактиватор', 'Стабилизатор', 'Субстрат', 'Антибиотик']

  return (
    <div>
      <h1 className="text-2xl font-semibold text-fg mb-6">
        Ингредиенты <span className="text-fg-secondary font-normal text-base">({count})</span>
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <a
          href="/ingredients"
          className={`px-3 py-1 rounded-full text-sm ${!type ? 'bg-accent text-white' : 'bg-card text-fg'}`}
        >
          Все
        </a>
        {allTypes.map((t) => (
          <a
            key={t}
            href={`/ingredients?type=${t}`}
            className={`px-3 py-1 rounded-full text-sm ${type === t ? 'bg-accent text-white' : 'bg-card text-fg'}`}
          >
            {t}
          </a>
        ))}
      </div>

      <div className="bg-card rounded-2xl overflow-hidden">
        <ul>
          {results.map((ingredient, i) => (
            <li
              key={ingredient.id}
              className={`flex items-center justify-between px-5 py-3 text-sm ${i > 0 ? 'border-t border-subtle' : ''}`}
            >
              <span className="text-fg">{ingredient.name}</span>
              <span className="text-xs text-fg-secondary bg-subtle px-2 py-0.5 rounded-full">
                {ingredient.type}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
