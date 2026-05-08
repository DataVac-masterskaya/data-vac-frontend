import { fetchAllVaccineIds, fetchVaccineById } from '@/shared/api/vaccines'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const ids = await fetchAllVaccineIds()
  return ids.map((id) => ({ id: String(id) }))
}

export default async function VaccineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vaccine = await fetchVaccineById(Number(id))

  if (!vaccine) notFound()

  return (
    <div className="max-w-2xl">
      <a href="/vaccines" className="text-sm text-accent hover:underline mb-4 inline-block">
        ← Назад к вакцинам
      </a>

      <div className="bg-card rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-fg mb-6">{vaccine.name}</h1>

        <dl className="flex flex-col gap-4 text-sm">
          <div>
            <dt className="text-fg-secondary text-xs mb-1">Инфекции</dt>
            <dd className="flex flex-wrap gap-1">
              {vaccine.infections.map((inf) => (
                <span key={inf} className="px-2 py-0.5 bg-subtle rounded-full text-fg text-xs">
                  {inf}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="text-fg-secondary text-xs mb-1">Способ введения</dt>
            <dd className="text-fg">{vaccine.administration_method}</dd>
          </div>

          <div>
            <dt className="text-fg-secondary text-xs mb-1">Возрастные ограничения</dt>
            <dd className="text-fg">
              {vaccine.min_age_months !== null
                ? `от ${Math.floor(vaccine.min_age_months / 12)} лет ${vaccine.min_age_months % 12 > 0 ? `${vaccine.min_age_months % 12} мес.` : ''}`
                : 'Не ограничено'}
              {vaccine.max_age_months !== null &&
                ` до ${Math.floor(vaccine.max_age_months / 12)} лет`}
            </dd>
          </div>

          <div>
            <dt className="text-fg-secondary text-xs mb-1">Разрешена при беременности</dt>
            <dd className="text-fg">{vaccine.allowed_during_pregnancy ? 'Да' : 'Нет'}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
