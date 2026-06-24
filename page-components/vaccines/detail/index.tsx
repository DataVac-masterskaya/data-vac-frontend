import { fetchAllVaccineIds, fetchVaccineById } from '@/shared/api/vaccines'
import { BackLink } from '@/shared/ui/back-link'
import { mapVaccineToSummary } from '@/page-components/vaccines/detail/map-vaccine-summary'
import { VaccineDetailLayout } from '@/page-components/vaccines/detail/vaccine-detail-layout'
import { VaccineSummarySidebar } from '@/page-components/vaccines/ui/vaccine-summary-sidebar'
import { VaccineDetailScreenInstruction } from './ui/vaccine-detail-screen-instruction'
import type { VaccineInstructionSection } from './ui/vaccine-detail-screen-instruction.types'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const ids = await fetchAllVaccineIds()
  return ids.map((id) => ({ id: String(id) }))
}

// TODO: заменить на данные из API когда будет готов контракт
const MOCK_INSTRUCTION_SECTIONS: VaccineInstructionSection[] = [
  {
    title: 'Допустимый возраст',
    content:
      'Первичная вакцинация и ревакцинация детей в возрасте от 2 месяцев до 2 лет против дифтерии, столбняка, коклюша, гепатита В, полиомиелита и инфекции, вызываемой Haemophilus influenzae тип b.',
  },
  {
    title: 'Противопоказания',
    content:
      'Повышенная чувствительность к действующим веществам вакцины или к любому из компонентов вакцины, а также к неомицину и полимиксину.\n' +
      'Повышенная чувствительность после предыдущего введения дифтерийной, столбнячной, коклюшной вакцин, вакцин против гепатита B, полиомиелита или инфекции, вызываемой Haemophilus influenzae типа b.\n' +
      'Энцефалопатия неясной этиологии, развившаяся в течение 7 дней после предшествующего введения вакцины, содержащей коклюшный компонент.\n' +
      'Острые инфекционные и неинфекционные заболевания, обострение хронических заболеваний являются временными противопоказаниями для проведения прививок.',
  },
  {
    title: 'Способы введения',
    content:
      'Вакцину следует вводить глубоко внутримышечно, чередуя стороны при последующих инъекциях. Рекомендуемое место введения вакцины Инфанрикс Гекса — средняя треть переднелатеральной поверхности бедра.\nНе вводить вакцину внутривенно или внутрикожно.',
  },
  {
    title: 'Состав',
    content:
      'Вакцину следует вводить глубоко внутримышечно, чередуя стороны при последующих инъекциях. Рекомендуемое место введения вакцины Инфанрикс Гекса — средняя треть переднелатеральной поверхности бедра.\nНе вводить вакцину внутривенно или внутрикожно.',
  },
  {
    title: 'Применение при беременности и грудном вскармливании',
    content:
      'По результатам исследований на животных, репродуктивная токсичность и тератогенность отсутствуют. Клинические исследования Гам-КОВИД-Вак при беременности не проводились. В связи с этим применять препарат Гам-КОВИД-Вак при беременности следует в тех случаях, когда ожидаемая польза для матери превышает потенциальный риск для плода с 22 недели беременности.\n' +
      'Клинические данные по применению препарата Гам-КОВИД-Вак у женщин, кормящих грудью, и младенцев отсутствуют. В настоящее время неизвестно, способны ли действующие вещества, входящие в состав вакцины, проникать в грудное молоко.',
  },
  {
    title: 'Взаимодействие с препаратами',
    content: 'Специальных исследований лекарственного взаимодействия не проводилось.',
  },
  {
    title: 'Одновременное введение с другими вакцинами',
    content:
      'Не допускается смешивание вакцины с другими вакцинами или иными лекарственными средствами в одном шприце, т.к. нет данных о фармацевтическом взаимодействии.',
  },
  {
    title: 'Хранение',
    content:
      'Производственная площадка АО "Р-Фарм", Россия: Компонент 1-6 месяцев.\n' +
      'Производственная площадка ООО "СПУТНИК ТЕХНОПОЛИС", Россия: Компонент II - 6 месяцев.\n' +
      'Не применять по истечении срока годности.\n' +
      'Хранить в недоступном для детей месте.',
  },
]

export default async function VaccineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const vaccine = await fetchVaccineById(Number(id))

  if (!vaccine) notFound()

  const summary = mapVaccineToSummary(vaccine)

  return (
    <div>
      <BackLink href="/vaccines" label="Назад к вакцинам" className="mb-4" />

      <h1 className="text-2xl font-semibold text-fg mb-6">{vaccine.name}</h1>

      <VaccineDetailLayout sidebar={<VaccineSummarySidebar {...summary} />}>
        <VaccineDetailScreenInstruction sections={MOCK_INSTRUCTION_SECTIONS} />
      </VaccineDetailLayout>
    </div>
  )
}
