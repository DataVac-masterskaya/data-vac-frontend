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
  { value: 'Почки', label: 'Почки' },
  { value: 'Сердце', label: 'Сердце' },
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
    results.reduce<Record<string, typeof results>>((acc, item) => {
      const key = item.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {}),
  ).map(([title, items]) => {
    // Группируем внутри категории по подкатегории (если есть)
    const subMap = items.reduce<Record<string, typeof items>>((acc, item) => {
      const key = item.subcategory ?? title;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    const groups = Object.entries(subMap).map(([subTitle, subItems]) => ({
      category: subTitle,
      items: subItems.map((item) => ({
        text: item.name,
        // TODO: заменить на реальный признак активности из ответа API
        isActive: false,
        linkText: 'Перейти к списку ингредиентов',
      })),
    }));

    return { title, groups };
  });

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
        {groupedCards.length === 0 ? (
          <div className="mt-4 bg-card rounded-2xl p-10 text-center text-fg-secondary">
            Ничего не найдено
          </div>
        ) : (
          groupedCards.map((card) =>
            card.groups.length === 1 && card.groups[0].items.length === 1 ? (
              <ContraIndicationRow
                key={card.title}
                category={card.title}
                text={card.groups[0].items[0].text}
                linkText={card.groups[0].items[0].linkText}
              />
            ) : (
              <ContraIndicationGroupCard
                key={card.title}
                title={card.title}
                groups={card.groups}
              />
            ),
          )
        )}
      </div>
    </div>
  );
}
