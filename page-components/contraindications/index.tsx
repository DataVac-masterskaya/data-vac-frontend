import { fetchContraindications } from '@/shared/api/contraindications';
import { ContraIndicationGroupCard } from './ui/ContraIndicationGroupCard/ContraIndicationGroupCard';

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
          isActive: index === 0,
          linkText: 'Перейти к списку ингредиентов',
        })),
      },
    ],
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-fg mb-6">
        Противопоказания{' '}
        <span className="text-fg-secondary font-normal text-base">
          ({count})
        </span>
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(({ value, label }) => (
          <a
            key={value}
            href={
              value
                ? `/contraindications?category=${encodeURIComponent(value)}`
                : '/contraindications'
            }
            className={`px-3 py-1 rounded-full text-sm ${category === value || (!category && !value) ? 'bg-accent text-white' : 'bg-card text-fg'}`}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-4">
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
