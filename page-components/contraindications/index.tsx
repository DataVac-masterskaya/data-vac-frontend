import {
  fetchContraindications,
  fetchContraindicationCategories,
} from '@/shared/api/contraindications';
import { ResultsHeader } from '@/shared/ui/ResultsHeader';
import { buildVaccinesPageHref } from '@/page-components/vaccines/model/sort';
import { ContraIndicationGroupCard } from './ui/ContraIndicationGroupCard/ContraIndicationGroupCard';
import { ContraindicationsFilter } from './ui/ContraindicationsFilter';
import { ContraIndicationRow } from './ui/ContraIndicationRow';

export default async function ContraindicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [results, categories] = await Promise.all([
    fetchContraindications({
      sort: 'popularity',
      category: category || undefined,
    }).catch(() => [] as Awaited<ReturnType<typeof fetchContraindications>>),
    fetchContraindicationCategories().catch(() => [] as Awaited<ReturnType<typeof fetchContraindicationCategories>>),
  ]);

  const filterCategories = [
    { value: '', label: 'Все' },
    ...categories.map((c) => ({ value: c.name, label: c.name })),
  ];

  const withCategory = results.filter((item) => item.category);
  const withoutCategory = results.filter((item) => !item.category);

  const groupedCards = Object.entries(
    withCategory.reduce<Record<string, typeof withCategory>>((acc, item) => {
      const key = item.category!.name;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {}),
  ).sort(([a]) => (a === 'Гиперчувствительность' ? -1 : 0)).map(([title, items]) => {
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
        href: buildVaccinesPageHref({ contraindicationId: item.id, label: item.name }),
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
            categories={filterCategories}
          />
        }
      />

      <div className="mt-4 flex flex-col gap-2">
        {groupedCards.length === 0 && withoutCategory.length === 0 ? (
          <div className="mt-4 bg-card rounded-2xl p-10 text-center text-fg-secondary">
            Ничего не найдено
          </div>
        ) : (
          <>
            {groupedCards.map((card) =>
              card.groups.length === 1 && card.groups[0].items.length === 1 ? (
                <ContraIndicationRow
                  key={card.title}
                  category={card.title}
                  text={card.groups[0].items[0].text}
                  linkText="Перейти к списку ингредиентов"
                  href="/ingredients"
                />
              ) : (
                <ContraIndicationGroupCard
                  key={card.title}
                  title={card.title}
                  groups={card.groups}
                />
              ),
            )}

            {/* withoutCategory items are hidden until the backend assigns categories */}
          </>
        )}
      </div>
    </div>
  );
}
