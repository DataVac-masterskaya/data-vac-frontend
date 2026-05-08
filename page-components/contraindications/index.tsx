import { fetchContraindications } from '@/shared/api/contraindications'

const CATEGORIES = [
  { value: '', label: 'Все' },
  { value: 'Абсолютные', label: 'Абсолютные' },
  { value: 'Относительные', label: 'Относительные' },
  { value: 'Временные', label: 'Временные' },
]

export default async function ContraindicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const { results, count } = await fetchContraindications({
    sort: 'popularity',
    category: category || undefined,
  })

  return (
    <div>
      <h1 className="text-2xl font-semibold text-fg mb-6">
        Противопоказания <span className="text-fg-secondary font-normal text-base">({count})</span>
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(({ value, label }) => (
          <a
            key={value}
            href={value ? `/contraindications?category=${encodeURIComponent(value)}` : '/contraindications'}
            className={`px-3 py-1 rounded-full text-sm ${category === value || (!category && !value) ? 'bg-accent text-white' : 'bg-card text-fg'}`}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="bg-card rounded-2xl overflow-hidden">
        <ul>
          {results.map((contraindication, i) => (
            <li
              key={contraindication.id}
              className={`flex items-center justify-between px-5 py-3 text-sm ${i > 0 ? 'border-t border-subtle' : ''}`}
            >
              <span className="text-fg">{contraindication.name}</span>
              <span className="text-xs text-fg-secondary bg-subtle px-2 py-0.5 rounded-full">
                {contraindication.category}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
