import { fetchContraindications } from '@/shared/api/contraindications';
import { fetchInfections } from '@/shared/api/infections';
import { fetchIngredients } from '@/shared/api/ingredients';
import { fetchVaccines } from '@/shared/api/vaccines';
import { buildVaccinesPageHref } from '@/page-components/vaccines/model/sort';
import { CategoryCard } from './ui/category-card/category-card';
import { DECORATIVE_SHAPES } from '@/shared/ui/decorative-shapes';

export default async function HomePage() {
  const [vaccinesRes, infectionsRes, ingredientsRes, contraindicationsRes] =
    await Promise.allSettled([
      fetchVaccines({ sort: 'popularity', limit: 10 }),
      fetchInfections({ sort: 'name_asc', limit: 10 }),
      fetchIngredients({ sort: 'popularity', limit: 10 }),
      fetchContraindications({ sort: 'popularity' }),
    ]);

  const vaccines = vaccinesRes.status === 'fulfilled' ? vaccinesRes.value : { results: [] };
  const infections = infectionsRes.status === 'fulfilled' ? infectionsRes.value : { results: [] };
  const ingredients = ingredientsRes.status === 'fulfilled' ? ingredientsRes.value : { results: [] };
  const contraindications = contraindicationsRes.status === 'fulfilled' ? contraindicationsRes.value : [];

  const sections = [
    {
      title: 'Вакцины',
      viewAllHref: '/vaccines',
      decorationImage: DECORATIVE_SHAPES.bumpy.src,
      layout: '2col' as const,
      items: vaccines.results.map((v) => ({
        id: v.id,
        name: v.name,
        popularity: v.popularity ?? 0,
        href: `/vaccines/${v.id}`,
      })),
    },
    {
      title: 'Инфекции',
      viewAllHref: '/infections',
      decorationImage: DECORATIVE_SHAPES.porous.src,
      layout: '2col' as const,
      items: infections.results.map((v) => ({
        id: v.id,
        name: v.name,
        popularity: v.popularity,
        href: buildVaccinesPageHref({ infectionId: v.id }),
      })),
    },
    {
      title: 'Противопоказания',
      viewAllHref: '/contraindications',
      decorationImage: DECORATIVE_SHAPES.layered.src,
      layout: '1col' as const,
      items: contraindications.slice(0, 10).map((v) => ({
        id: v.id,
        name: v.name,
        popularity: v.popularity,
        href: buildVaccinesPageHref({ contraindicationId: v.id }),
      })),
    },
    {
      title: 'Ингредиенты',
      viewAllHref: '/ingredients',
      decorationImage: DECORATIVE_SHAPES.cluster.src,
      layout: '2col' as const,
      items: ingredients.results.map((v) => ({
        id: v.id,
        name: v.name,
        popularity: v.popularity,
        href: buildVaccinesPageHref({ ingredientId: v.id }),
      })),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 md:gap-3 xl:gap-5">
      {sections.map(
        ({ title, viewAllHref, decorationImage, items, layout }) => (
          <CategoryCard
            key={title}
            title={title}
            viewAllHref={viewAllHref}
            decorationImage={decorationImage}
            items={items}
            layout={layout}
          />
        ),
      )}
    </div>
  );
}
