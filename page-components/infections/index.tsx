import { fetchInfections } from '@/shared/api/infections'
import { InfectionsList } from './ui/InfectionsList'
import InfectionsFilter from './ui/InfectionsFilter'
import { Separator } from '@/shared/ui/separator'
import { SortControlWrapper } from './ui/SortControlWrapper'
import { BackLink } from '@/shared/ui/back-link'

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
      <div className="flex flex-col gap-y-4">
        <BackLink href="/" />
        <h1 className="text-2xl font-normal text-fg">Инфекции</h1>
        <div className="flex flex-col items-start gap-[19px] min-[768px]:!flex-row min-[768px]:justify-between min-[768px]:items-center">
          <InfectionsFilter categories={CATEGORIES} activeCategory={category || ''} />
          <span className="text-fg-secondary font-normal text-base">{count} результатов</span>
        </div>
      </div>
      <Separator className="mt-4" />
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
