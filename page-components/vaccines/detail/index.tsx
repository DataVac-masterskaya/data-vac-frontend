import { fetchAllVaccineIds, fetchVaccineById } from '@/shared/api/vaccines'
import { BackLink } from '@/shared/ui/back-link'
import { mapVaccineToSummary } from '@/page-components/vaccines/detail/map-vaccine-summary'
import { VaccineDetailLayout } from '@/page-components/vaccines/detail/vaccine-detail-layout'
import { VaccineSummarySidebar } from '@/page-components/vaccines/ui/vaccine-summary-sidebar'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const ids = await fetchAllVaccineIds()
  return ids.map((id) => ({ id: String(id) }))
}

export default async function VaccineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vaccine = await fetchVaccineById(Number(id))

  if (!vaccine) notFound()

  const summary = mapVaccineToSummary(vaccine)

  return (
    <div>
      <BackLink href="/vaccines" label="Назад к вакцинам" className="mb-4" />

      <h1 className="text-2xl font-semibold text-fg mb-6">{vaccine.name}</h1>

      <VaccineDetailLayout sidebar={<VaccineSummarySidebar {...summary} />}>
        <article className="min-w-0">
          <div className="bg-card rounded-2xl p-6">
            <p className="text-sm text-fg-secondary">
              Подробная информация о вакцине будет добавлена позже.
            </p>
          </div>
        </article>
      </VaccineDetailLayout>
    </div>
  )
}
