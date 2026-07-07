import { fetchContraindications } from '@/shared/api/contraindications'
import { fetchInfections } from '@/shared/api/infections'
import { fetchIngredients } from '@/shared/api/ingredients'
import { fetchVaccines } from '@/shared/api/vaccines'
import { CategoryCard } from './ui/category-card/category-card'
import { DECORATIVE_SHAPES } from '@/shared/ui/decorative-shapes'

export default async function HomePage() {
  const [vaccines, infections, ingredients, contraindications] = await Promise.all([
    fetchVaccines({ sort: 'popularity', limit: 10 }),
    fetchInfections({ sort: 'name_desc', limit: 10 }),
    fetchIngredients({ sort: 'popularity', limit: 10 }),
    fetchContraindications({ sort: 'popularity', limit: 10 }),
  ])

    const sections = [
    {
      title: 'Вакцины',
      viewAllHref: '/vaccines',
      decorationImage: DECORATIVE_SHAPES.bumpy.src,
      layout: '2col' as const,
      items: vaccines.results.map((v) => ({
        id: v.id,
        name: v.name,
        popularity: v.popularity,
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
        href: `/infections/${v.id}`,
      })),
    },
    {
      title: 'Противопоказания',
      viewAllHref: '/contraindications',
      decorationImage: DECORATIVE_SHAPES.layered.src,
      layout: '1col' as const, // <- только здесь 1 колонка
      items: contraindications.results.map((v) => ({
        id: v.id,
        name: v.name,
        popularity: v.popularity,
        href: `/contraindications/${v.id}`,
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
        href: `/ingredients/${v.id}`,
      })),
    },
  ]
     return (
      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 w-full
      gap-2 
      md:!gap-3 
      xl:!gap-5">
        {sections.map(({ title, viewAllHref, decorationImage, items,layout }) => (
          <CategoryCard
            key={title}
            title={title}
            viewAllHref={viewAllHref}
            decorationImage={decorationImage}
            items={items}
             layout={layout}
          />
        ))}
      </div>
  )
}