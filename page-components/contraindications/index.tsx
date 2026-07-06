import { fetchContraindications } from '@/shared/api/contraindications';
import { BackLink } from '@/shared/ui/back-link';
import { Separator } from '@/shared/ui/separator';
import { resultsLabel } from '@/shared/lib/pluralize';
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
  const { results, count } = await fetchContraindications({
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
      <BackLink href="/" />

      <h1 className="pt-4 pb-4 text-2xl font-normal text-fg">
        Противопоказания
      </h1>

      <div className="flex min-h-8 flex-wrap items-center justify-between gap-4">
        <ContraindicationsFilter activeCategory={category || ''} categories={CATEGORIES} />
        <p className="shrink-0 text-xs font-normal text-fg-muted">
          {resultsLabel(count)}
        </p>
      </div>

      <Separator className="mt-4" />

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
