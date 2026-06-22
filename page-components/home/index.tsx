import { fetchContraindications } from '@/shared/api/contraindications'
import { fetchInfections } from '@/shared/api/infections'
import { fetchIngredients } from '@/shared/api/ingredients'
import { fetchVaccines } from '@/shared/api/vaccines'
import { CategoryCard } from './ui/category-card/category-card'
import shape from './ui/assets/shape.webp'
import shape1 from './ui/assets/shape-1.webp'
import shape2 from './ui/assets/shape-2.webp'
import shape3 from './ui/assets/shape-3.webp'

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
      decorationImage: shape.src,
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
      decorationImage: shape1.src,
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
      decorationImage: shape2.src,
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
      decorationImage: shape3.src,
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
