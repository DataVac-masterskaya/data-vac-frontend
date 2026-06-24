import { fetchAllVaccineIds, fetchVaccineById } from '@/shared/api/vaccines';
import { BackLink } from '@/shared/ui/back-link';
import { mapVaccineToSummary } from '@/page-components/vaccines/detail/map-vaccine-summary';
import { VaccineDetailLayout } from '@/page-components/vaccines/detail/vaccine-detail-layout';
import { VaccineSummarySidebar } from '@/page-components/vaccines/ui/vaccine-summary-sidebar';
import { VaccineDetailScreenInstruction } from './ui/vaccine-detail-screen-instruction';
import type { VaccineInstructionSection } from './ui/vaccine-detail-screen-instruction.types';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const ids = await fetchAllVaccineIds();
  return ids.map((id) => ({ id: String(id) }));
}

export default async function VaccineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vaccine = await fetchVaccineById(Number(id));

  if (!vaccine) notFound();

  const summary = mapVaccineToSummary(vaccine);

  const instructionSections: VaccineInstructionSection[] = [
    {
      title: 'Допустимый возраст',
      content:
        'Первичная вакцинация и ревакцинация детей в возрасте от 2 месяцев до 2 лет против дифтерии, столбняка, коклюша, гепатита В, полиомиелита и инфекции, вызываемой Haemophilus influenzae тип b.',
    },
    {
      title: 'Способы введения',
      content:
        'Вакцину следует вводить глубоко внутримышечно, чередуя стороны при последующих инъекциях. Рекомендуемое место введения вакцины Инфанрикс Гекса — средняя треть переднелатеральной поверхности бедра.Не вводить вакцину внутривенно или внутрикожно.',
    },
    {
      title: 'Одновременное введение с другими вакцинами',
      content:
        'Не допускается смешивание вакцины с другими вакцинами или иными лекарственными средствами в одном шприце, т.к. нет данных о фармацевтическом взаимодействии.',
    },
  ];

  return (
    <div>
      <BackLink href="/vaccines" label="Назад к вакцинам" className="mb-4" />

      <h1 className="text-2xl font-semibold text-fg mb-6">{vaccine.name}</h1>

      <VaccineDetailLayout sidebar={<VaccineSummarySidebar {...summary} />}>
        <VaccineDetailScreenInstruction sections={instructionSections} />
      </VaccineDetailLayout>
    </div>
  );
}
