import { VaccineAlphabetFilter } from "./VaccineAlphabetFilter"
import { VaccineCatalog } from "../ui/VaccineCatalog"
import { fetchVaccines } from "@/shared/api/vaccines"
import { Suspense } from "react"
import { mapVaccineToTableRowOnPageVaccine } from "../lib/map-vaccine-to-table-row"
import { ResultsHeader } from "@/shared/ui/ResultsHeader"

export default async function VaccineCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{
    letter?: string
  }>
}) {
  const { letter } = await searchParams;
  const { results, count} = await fetchVaccines({
    letter: letter || undefined,
  })
  const vaccines = results.map(mapVaccineToTableRowOnPageVaccine)

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
          <div>
            <VaccineCatalog data={vaccines}/>
          </div>
        )}
      </div>
    </div>
  )
}
