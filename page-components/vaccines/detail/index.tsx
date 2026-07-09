import { fetchAllVaccineIds, fetchVaccineById } from '@/shared/api/vaccines'
import { BackLink } from '@/shared/ui/back-link'
import { mapVaccineToDetailPageData } from '@/page-components/vaccines/detail/map-vaccine-detail'
import { VaccineDetailLayout } from '@/page-components/vaccines/detail/vaccine-detail-layout'
import { VaccineSummarySidebar } from '@/page-components/vaccines/ui/vaccine-summary-sidebar'
import { notFound } from 'next/navigation'
import { VaccineDetailContent } from './ui/vaccine-detail-content'

export async function generateStaticParams() {
  const ids = await fetchAllVaccineIds()
  return ids.map((id) => ({ id: String(id) }))
}

export default async function VaccineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const vaccine = await fetchVaccineById(Number(id))

  if (!vaccine) notFound()

  const { name, summary, processedSections, instructionSections, orgComment } =
    mapVaccineToDetailPageData(vaccine)

  return (
    <div>
      <BackLink href="/vaccines" label="Назад к вакцинам" className="mb-4" />

      <h1 className="text-2xl font-semibold text-fg mb-6">{name}</h1>

      <VaccineDetailLayout sidebar={<VaccineSummarySidebar {...summary} />}>
        <VaccineDetailContent
          processedSections={processedSections}
          instructionSections={instructionSections}
          orgComment={orgComment}
        />
      </VaccineDetailLayout>
    </div>
  )
}
