import { fetchVaccines } from '@/shared/api/vaccines'
import { mapVaccineToTableRow } from './lib/map-vaccine-to-table-row'
import { normalizeVaccineSort, vaccineSortToTable } from './model/sort'
import { VaccinesTable } from './ui/vaccines-table'

export default async function VaccinesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const { sort } = await searchParams
  const sortValue = normalizeVaccineSort(sort)
  const { results, count } = await fetchVaccines({
    sort: sortValue,
  })
  const vaccines = results.map(mapVaccineToTableRow)
  const { sortField, sortDirection } = vaccineSortToTable(sortValue)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-fg mb-6">
        Вакцины <span className="text-fg-secondary font-normal text-base">({count})</span>
      </h1>

      {vaccines.length === 0 ? (
        <div className="bg-card rounded-2xl p-10 text-center text-fg-secondary">
          Ничего не найдено
        </div>
      ) : (
        <div className="bg-card rounded-2xl overflow-hidden">
          <VaccinesTable
            vaccines={vaccines}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        </div>
      )}
    </div>
  )
}
