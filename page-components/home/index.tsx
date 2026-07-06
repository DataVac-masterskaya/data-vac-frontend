import { fetchContraindications } from '@/shared/api/contraindications'
import { fetchInfections } from '@/shared/api/infections'
import { fetchIngredients } from '@/shared/api/ingredients'
import { fetchVaccines } from '@/shared/api/vaccines'
import { CategoryCard } from './ui/category-card/category-card'
import { DECORATIVE_SHAPES } from '@/shared/ui/decorative-shapes'
export default async function HomePage() {
  const [vaccines, infections, ingredients, contraindications] = await Promise.all([
    fetchVaccines({ sort: 'popularity', limit: 5 }),
    fetchInfections({ sort: 'name_asc', limit: 5 }),
    fetchIngredients({ sort: 'popularity', limit: 5 }),
    fetchContraindications({ sort: 'popularity', limit: 5 }),
  ])

  const sections = [
    {
      title: 'Вакцины',
      viewAllHref: '/vaccines',
      decorationImage: DECORATIVE_SHAPES.bumpy.src,
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
      items: infections.results.map((v) => ({
        id: v.id,
        name: v.name,
        popularity: v.popularity,
        href: `/infections/${v.id}`,
      })),
    },
    {
      title: 'Ингредиенты',
      viewAllHref: '/ingredients',
      decorationImage: DECORATIVE_SHAPES.cluster.src,
      items: ingredients.results.map((v) => ({
        id: v.id,
        name: v.name,
        popularity: v.popularity,
        href: `/ingredients/${v.id}`,
      })),
    },
    {
      title: 'Противопоказания',
      viewAllHref: '/contraindications',
      decorationImage: DECORATIVE_SHAPES.layered.src,
      items: contraindications.results.map((v) => ({
        id: v.id,
        name: v.name,
        popularity: v.popularity,
        href: `/contraindications/${v.id}`,
      })),
    },
  ]

  return (
      <div>
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-6">
          {sections.map(({ title, viewAllHref, decorationImage, items }) => (
            <CategoryCard
              key={title}
              title={title}
              viewAllHref={viewAllHref}
              decorationImage={decorationImage}
              items={items}
              layout="1col"
            />
          ))}
        </div>
      </div>
  )
}
