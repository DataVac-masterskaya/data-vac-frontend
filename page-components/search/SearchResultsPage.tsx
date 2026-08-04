import { ResultsHeader } from '@/shared/ui/ResultsHeader'
import { EmptyState, ErrorState, ScrollToTopButton } from '@datavac/ui-kit'
import { fetchVaccines } from '@/shared/api/vaccines'
import { mapVaccineToTableRow } from '@/page-components/vaccines/lib/map-vaccine-to-table-row'
import { normalizeVaccineSort, vaccineSortToTable } from '@/page-components/vaccines/model/sort'
import { VACCINE_PAGE_WIDTH_CLASS, VaccinesTable } from '@/page-components/vaccines/ui/vaccines-table'

type SearchResultsPageProps = {
  query: string
  sort?: string
}

export async function SearchResultsPage({ query, sort }: SearchResultsPageProps) {
  let vaccines: ReturnType<typeof mapVaccineToTableRow>[] = []
  let count = 0
  let error: string | null = null

  const sortValue = normalizeVaccineSort(sort)

  try {
    const { results, count: total } = await fetchVaccines({
      sort: sortValue,
      q: query,
    })
    vaccines = results.map(mapVaccineToTableRow)
    count = total
  } catch {
    error = 'Не удалось загрузить результаты поиска. Попробуйте позже.'
  }

  const { sortField, sortDirection } = vaccineSortToTable(sortValue)

  return (
    <div className={`${VACCINE_PAGE_WIDTH_CLASS} flex flex-col`}>
      <ResultsHeader title={query} count={!error ? count : undefined} />

      {error ? (
        <div className="mt-6">
          <ErrorState message={error} />
        </div>
      ) : vaccines.length === 0 ? (
        <div className="mt-6">
          <EmptyState message={`По запросу "${query}" ничего не найдено`} />
        </div>
      ) : (
        <div className="mt-6">
          <VaccinesTable
            vaccines={vaccines}
            sortField={sortField}
            sortDirection={sortDirection}
            q={query}
          />
        </div>
      )}

      <ScrollToTopButton />
    </div>
  )
}
