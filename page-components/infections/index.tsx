import { fetchInfections } from '@/shared/api/infections'

const CATEGORIES = [
  { value: '', label: 'Все' },
  { value: 'national_calendar', label: 'Национальный календарь' },
  { value: 'extended', label: 'Расширенный' },
  { value: 'other', label: 'Другие' },
]

export default async function InfectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const { results, count } = await fetchInfections({
    sort: 'popularity',
    category: category || undefined,
  })

  return (
    <div>
      <h1 className="text-2xl font-semibold text-fg mb-6">
        Инфекции <span className="text-fg-secondary font-normal text-base">({count})</span>
      </h1>

      <div className="flex gap-2 mb-6">
        {CATEGORIES.map(({ value, label }) => (
          <a
            key={value}
            href={value ? `/infections?category=${value}` : '/infections'}
            className={`px-3 py-1 rounded-full text-sm ${category === value || (!category && !value) ? 'bg-accent text-white' : 'bg-card text-fg'}`}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="bg-card rounded-2xl overflow-hidden">
        <ul>
          {results.map((infection, i) => (
            <li
              key={infection.id}
              className={`flex items-center justify-between px-5 py-3 text-sm ${i > 0 ? 'border-t border-subtle' : ''}`}
            >
              <span className="text-fg">{infection.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-fg-secondary">
                  {CATEGORIES.find((c) => c.value === infection.category)?.label}
                </span>
                <a href={`/vaccines?infection_id=${infection.id}`} className="text-accent text-xs hover:underline">
                  Вакцины →
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
