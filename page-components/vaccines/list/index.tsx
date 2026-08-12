import { Suspense } from "react"
import { VaccineAlphabetFilter } from "./VaccineAlphabetFilter"
import { VaccineCatalog } from "../ui/VaccineCatalog"
import { fetchVaccines } from "@/shared/api/vaccines"
import { mapVaccineToCatalogItem } from "../lib/map-vaccine-to-table-row"
import { ResultsHeader } from "@/shared/ui/ResultsHeader"
import { PaginationControl } from "@/shared/ui/PaginationControl"
import { normalizeVaccineSort, vaccineSortToTable } from "../model/sort"

const PAGE_SIZE = 20

export default async function VaccineCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{
    letter?: string
    lang?: string
    sort?: string
    page?: string
  }>
}) {
  const { letter, sort, page: pageParam } = await searchParams
  const page = pageParam ? Math.max(1, Number(pageParam)) : 1
  const sortValue = normalizeVaccineSort(sort)
  const { results, count } = await fetchVaccines({
    letter: letter || undefined,
    sort: sortValue,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  })
  const vaccines = results.map(mapVaccineToCatalogItem)
  const { sortField, sortDirection } = vaccineSortToTable(sortValue)
  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1

  return (
    <div>
      <ResultsHeader
        title="Вакцины"
        count={count}
        filters={
          <Suspense fallback={null}>
            <VaccineAlphabetFilter />
          </Suspense>
        }
      />
      <div className="mt-6">
        {vaccines.length === 0 ? (
          <div className="mt-4 bg-card rounded-2xl p-10 text-center text-fg-secondary">
            Ничего не найдено
          </div>
        ) : (
          <Suspense fallback={null}>
            <VaccineCatalog data={vaccines} sortField={sortField} sortDirection={sortDirection} />
          </Suspense>
        )}
      </div>
      <PaginationControl page={page} totalPages={totalPages} />
    </div>
  )
}
