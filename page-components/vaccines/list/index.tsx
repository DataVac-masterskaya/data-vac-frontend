import { Suspense } from "react"
import { VaccineAlphabetFilter } from "./VaccineAlphabetFilter"
import { VaccineCatalog } from "../ui/VaccineCatalog"
import { fetchVaccines } from "@/shared/api/vaccines"
import { mapVaccineToCatalogItem } from "../lib/map-vaccine-to-table-row"
import { ResultsHeader } from "@/shared/ui/ResultsHeader"
import { normalizeVaccineSort, vaccineSortToTable } from "../model/sort"

export default async function VaccineCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{
    letter?: string
    lang?: string
    sort?: string
  }>
}) {
  const { letter, sort } = await searchParams
  const sortValue = normalizeVaccineSort(sort)
  const { results, count } = await fetchVaccines({
    letter: letter || undefined,
    sort: sortValue,
  })
  const vaccines = results.map(mapVaccineToCatalogItem)
  const { sortField, sortDirection } = vaccineSortToTable(sortValue)

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
    </div>
  )
}
