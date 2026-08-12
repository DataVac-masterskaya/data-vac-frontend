import { ResultsHeader } from '@/shared/ui/ResultsHeader'
import { PaginationControl } from '@/shared/ui/PaginationControl'
import { EmptyState, ErrorState, ScrollToTopButton } from '@datavac/ui-kit'
import { fetchVaccines } from '@/shared/api/vaccines'
import { fetchInfectionById } from '@/shared/api/infections'
import { fetchIngredientById } from '@/shared/api/ingredients'
import { fetchContraindicationById } from '@/shared/api/contraindications'
import { mapVaccineToTableRow } from '@/page-components/vaccines/lib/map-vaccine-to-table-row'
import { normalizeVaccineSort, vaccineSortToTable } from '@/page-components/vaccines/model/sort'
import { VACCINE_PAGE_WIDTH_CLASS, VaccinesTable } from '@/page-components/vaccines/ui/vaccines-table'

const PAGE_SIZE = 20

type SearchResultsPageProps = {
  query: string
  sort?: string
  page?: number
  infectionId?: number
  ingredientId?: number
  contraindicationId?: number
}

async function resolveSearchTitle(props: SearchResultsPageProps): Promise<string> {
  const { query, infectionId, ingredientId, contraindicationId } = props

  if (infectionId) {
    const infection = await fetchInfectionById(infectionId)
    return infection?.name ?? query
  }

  if (ingredientId) {
    const ingredient = await fetchIngredientById(ingredientId)
    return ingredient ? `Содержит: ${ingredient.name}` : query
  }

  if (contraindicationId) {
    const contraindication = await fetchContraindicationById(contraindicationId)
    return contraindication ? `Противопоказано с: ${contraindication.name}` : query
  }

  return `Поиск: ${query}`
}

export async function SearchResultsPage({
  query,
  sort,
  page = 1,
  infectionId,
  ingredientId,
  contraindicationId,
}: SearchResultsPageProps) {
  const sortValue = normalizeVaccineSort(sort)

  const [title, vaccinesResult] = await Promise.all([
    resolveSearchTitle({ query, infectionId, ingredientId, contraindicationId }),
    fetchVaccines({
      sort: sortValue,
      q: query,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      infection_id: infectionId,
      ingredient_id: ingredientId,
      contraindication_id: contraindicationId,
    }).catch((err: unknown) => err),
  ])

  const error =
    vaccinesResult instanceof Error
      ? 'Не удалось загрузить результаты поиска. Попробуйте позже.'
      : null

  const vaccines =
    error || !(vaccinesResult as { results?: unknown }).results
      ? []
      : (vaccinesResult as Awaited<ReturnType<typeof fetchVaccines>>).results.map(mapVaccineToTableRow)

  const count = error
    ? undefined
    : (vaccinesResult as Awaited<ReturnType<typeof fetchVaccines>>).count

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1

  const { sortField, sortDirection } = vaccineSortToTable(sortValue)

  return (
    <div className={`${VACCINE_PAGE_WIDTH_CLASS} flex flex-col`}>
      <ResultsHeader title={title} count={count} />

      {error ? (
        <div className="mt-6">
          <ErrorState message={error} />
        </div>
      ) : vaccines.length === 0 ? (
        <div className="mt-6">
          <EmptyState message={`По запросу "${query}" ничего не найдено`} />
        </div>
      ) : (
        <>
          <div className="mt-6">
            <VaccinesTable
              vaccines={vaccines}
              sortField={sortField}
              sortDirection={sortDirection}
              q={query}
              infectionId={infectionId}
              ingredientId={ingredientId}
              contraindicationId={contraindicationId}
            />
          </div>
          <PaginationControl page={page} totalPages={totalPages} />
        </>
      )}

      <ScrollToTopButton />
    </div>
  )
}
