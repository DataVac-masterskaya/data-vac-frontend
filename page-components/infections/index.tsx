import { fetchInfections } from '@/shared/api/infections'
import { InfectionsList } from './ui/InfectionsList'
import { InfectionsFilter } from './ui/InfectionsFilter'
import { ResultsHeader } from '@/shared/ui/ResultsHeader'
import { PaginationControl } from '@/shared/ui/PaginationControl'
import { SortControlWrapper } from './ui/SortControlWrapper'
import { Suspense } from 'react'

const CATEGORIES = [
  { value: '', label: 'Все' },
  { value: 'national_calendar', label: 'Национальный календарь' },
  { value: 'extended', label: 'Сверх календаря' },
  { value: 'other', label: 'Другие' },
]

const PAGE_SIZE = 40

export default async function InfectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>
}) {
  const { category, sort = 'popularity', page: pageParam } = await searchParams;
  const page = pageParam ? Math.max(1, Number(pageParam)) : 1
  const { results, count } = await fetchInfections({
    sort: sort as 'popularity' | 'name_asc' | 'name_desc',
    category: category || undefined,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });
  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1

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
        <SortControlWrapper sort={sort} />
      </div>
      <InfectionsList
        infections={results.map((infection) => ({
          id: infection.id,
          name: infection.name,
          categoryLabel: CATEGORIES.find((c) => c.value === infection.category)?.label ?? infection.category,
        }))}
      />
      <PaginationControl page={page} totalPages={totalPages} />
    </div>
  )
}
