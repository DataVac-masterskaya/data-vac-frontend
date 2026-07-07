import { BackLink } from "@/shared/ui/back-link"
import { VaccineAlphabetFilter } from "./VaccineAlphabetFilter"
import { Separator } from "@/shared/ui/separator"
import { VaccineCatalog } from "../ui/VaccineCatalog"
import { fetchVaccines } from "@/shared/api/vaccines"
import { Suspense } from "react"
import { mapVaccineToTableRowOnPageVaccine } from "../lib/map-vaccine-to-table-row"
import { resultsLabel } from "@/shared/lib/pluralize"

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
      <div className="flex flex-col gap-y-4">
        <BackLink href="/" />
        <h1 className="text-2xl font-normal text-fg">Вакцины</h1>
        <div className="flex flex-col items-start gap-[19px] md:!flex-row md:!justify-between md:!items-center">
          <Suspense fallback={null}>
            <VaccineAlphabetFilter />
          </Suspense>
          <span className="text-fg-secondary font-normal text-base">{resultsLabel(count)}</span>
        </div>
        <Separator/>
      </div>
      <div className="mt-4">
      </div>
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
