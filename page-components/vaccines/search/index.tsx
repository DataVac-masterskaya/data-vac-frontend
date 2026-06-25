import { BackLink } from '@/shared/ui/back-link'
import { Separator } from '@/shared/ui/separator'
import { sideMenuFont } from '@/shared/ui/SideMenu/side-menu-font'
import { fetchVaccines } from '@/shared/api/vaccines'
import { mapVaccineToTableRow } from '../lib/map-vaccine-to-table-row'
import { normalizeVaccineSort, vaccineSortToTable } from '../model/sort'
import { VACCINE_PAGE_WIDTH_CLASS, VaccinesTable } from '../ui/vaccines-table'

function resultsLabel(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return `${count} результат`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} результата`
  }
  return `${count} результатов`
}

export default async function VaccinesSearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string
    q?: string
    ingredient_id?: string
    infection_id?: string
  }>
}) {
  const { sort, q, ingredient_id, infection_id } = await searchParams
  const ingredientId = Number(ingredient_id)
  const infectionId = Number(infection_id)
  const query = q?.trim() || undefined
  const sortValue = normalizeVaccineSort(sort)
  const { results } = await fetchVaccines({
    sort: sortValue,
    q: query,
    ingredient_id: Number.isFinite(ingredientId) ? ingredientId : undefined,
    infection_id: Number.isFinite(infectionId) ? infectionId : undefined,
  })
  const vaccines = results.map(mapVaccineToTableRow)
  const { sortField, sortDirection } = vaccineSortToTable(sortValue)

  return (
    <div className={`${VACCINE_PAGE_WIDTH_CLASS} flex flex-col`}>
      <BackLink href="/" />

      <div className="flex items-baseline justify-between pt-4 pb-4">
        <h1 className={`${sideMenuFont.className} text-2xl font-normal text-fg`}>
          Вакцины
        </h1>
        <p className="shrink-0 text-xs font-normal text-fg-muted">
          {resultsLabel(vaccines.length)}
        </p>
      </div>

      <Separator className="mt-4" />

      {vaccines.length === 0 ? (
        <div className="mt-4 bg-card rounded-2xl p-10 text-center text-fg-secondary">
          Ничего не найдено
        </div>
      ) : (
        <div className="mt-4">
          <VaccinesTable
            vaccines={vaccines}
            sortField={sortField}
            sortDirection={sortDirection}
            q={query}
            ingredientId={Number.isFinite(ingredientId) ? ingredientId : undefined}
            infectionId={Number.isFinite(infectionId) ? infectionId : undefined}
          />
        </div>
      )}
    </div>
  )
}
