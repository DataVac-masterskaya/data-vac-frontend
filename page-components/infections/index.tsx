import { fetchInfections } from '@/shared/api/infections'
import { InfectionsList } from './ui/InfectionsList'
import { InfectionsFilter } from './ui/InfectionsFilter'
import { ResultsHeader } from '@/shared/ui/ResultsHeader'
import { SortControlWrapper } from './ui/SortControlWrapper'
import { Suspense } from 'react'

const CATEGORIES = [
  { value: '', label: 'Все' },
  { value: 'national_calendar', label: 'Национальный календарь' },
  { value: 'extended', label: 'Сверх календаря' },
  { value: 'other', label: 'Другие' },
]

export default async function InfectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string, sort?: string }>
}) {
  const { category, sort = 'name_asc' } = await searchParams;
  const { results, count } = await fetchInfections({
    sort: sort as 'name_asc' | 'name_desc',
    category: category || undefined,
  });

  return (
    <div>
      <ResultsHeader
        title="Инфекции"
        count={count}
        filters={
          <Suspense fallback={null}>
            <InfectionsFilter categories={CATEGORIES} activeCategory={category || ''} />
          </Suspense>
        }
      />
      <div className="py-6 md:px-3">
        <SortControlWrapper />
      </div>
      <InfectionsList
        infections={results.map((infection) => ({
          id: infection.id,
          name: infection.name,
          categoryLabel: CATEGORIES.find((c) => c.value === infection.category)?.label ?? infection.category,
        }))}
      />
    </div>
  )
}
