import { fetchContraindications } from '@/shared/api/contraindications';
import { ResultsHeader } from '@/shared/ui/ResultsHeader';
import { ContraIndicationGroupCard } from './ui/ContraIndicationGroupCard/ContraIndicationGroupCard';
import { ContraindicationsFilter } from './ui/ContraindicationsFilter';
import { ContraIndicationRow } from './ui/ContraIndicationRow';

const CATEGORIES = [
  { value: '', label: 'Все' },
  { value: 'Хронические заболевания', label: 'Хронические заболевания' },
  { value: 'Острые заболевания', label: 'Острые заболевания' },
  { value: 'Аллергии', label: 'Аллергии' },
  { value: 'Сердце', label: 'Сердце' },
  { value: 'Почки', label: 'Почки' },
  { value: 'Иммунодефициты', label: 'Иммунодефициты' },
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
  const simpleRows = groupedCards.filter((g) => g.groups[0].items.length === 1);
  const groupCards = groupedCards.filter((g) => g.groups[0].items.length > 1);

  if (groupedCards.length === 0) {
    return (
      <div>
        <ResultsHeader
          title="Противопоказания"
          count={results.length}
          filters={
            <ContraindicationsFilter
              activeCategory={category || ''}
              categories={CATEGORIES}
            />
          }
        />
        <div className="mt-4 bg-card rounded-2xl p-10 text-center text-fg-secondary">
          Ничего не найдено
        </div>
      </div>
    );
  }

  return (
    <div>
      <ResultsHeader
        title="Противопоказания"
        count={results.length}
        filters={
          <ContraindicationsFilter
            activeCategory={category || ''}
            categories={CATEGORIES}
          />
        }
      />

      <div className="mt-4 flex flex-col gap-2">
        {simpleRows.map((row) => (
          <ContraIndicationRow
            key={row.title}
            category={row.title}
            text={row.groups[0].items[0].text}
            linkText={row.groups[0].items[0].linkText}
          />
        ))}

        {groupCards.map((card) => (
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
