import { fetchContraindications } from '@/shared/api/contraindications';
import { ResultsHeader } from '@/shared/ui/ResultsHeader';
import { ContraIndicationGroupCard } from './ui/ContraIndicationGroupCard/ContraIndicationGroupCard';
import { ContraindicationsFilter } from './ui/ContraindicationsFilter';

const CATEGORIES = [
  { value: '', label: 'Все' },
  { value: 'Абсолютные', label: 'Абсолютные' },
  { value: 'Относительные', label: 'Относительные' },
  { value: 'Временные', label: 'Временные' },
];

export default async function ContraindicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const { results } = await fetchContraindications({
    sort: 'popularity',
    category: category || undefined,
  });

  const groupedCards = Object.entries(
    results.reduce<Record<string, typeof results>>((acc, contraindication) => {
      const groupKey = contraindication.category;

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }

      acc[groupKey].push(contraindication);

      return acc;
    }, {}),
  ).map(([title, items]) => ({
    title,
    groups: [
      {
        category: title,
        items: items.map((item, index) => ({
          text: item.name,
          // TODO: заменить на реальный признак активности из ответа API
          isActive: false,
          linkText: 'Перейти к списку ингредиентов',
        })),
      },
    ],
  }));

  return (
    <div>
      <ResultsHeader
        title="Противопоказания"
        filters={<ContraindicationsFilter activeCategory={category || ''} categories={CATEGORIES} />}
      />

      <div className="mt-4 flex flex-col gap-4">
        {groupedCards.map((card) => (
          <ContraIndicationGroupCard
            key={card.title}
            title={card.title}
            groups={card.groups}
          />
        ))}
      </div>
    </div>
  );
}
