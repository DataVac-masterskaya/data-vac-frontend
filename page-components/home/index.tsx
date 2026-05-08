import { Badge, Button } from '@datavac/ui-kit'
import { fetchContraindications } from '@/shared/api/contraindications'
import { fetchInfections } from '@/shared/api/infections'
import { fetchIngredients } from '@/shared/api/ingredients'
import { fetchVaccines } from '@/shared/api/vaccines'

export default async function HomePage() {
  const [vaccines, infections, ingredients, contraindications] = await Promise.all([
    fetchVaccines({ sort: 'popularity', limit: 5 }),
    fetchInfections({ sort: 'popularity', limit: 5 }),
    fetchIngredients({ sort: 'popularity', limit: 5 }),
    fetchContraindications({ sort: 'popularity', limit: 5 }),
  ])

  const sections = [
    { title: 'Вакцины', href: '/vaccines', items: vaccines.results },
    { title: 'Инфекции', href: '/infections', items: infections.results },
    { title: 'Ингредиенты', href: '/ingredients', items: ingredients.results },
    { title: 'Противопоказания', href: '/contraindications', items: contraindications.results },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold text-fg mb-6">Главная</h1>
      <div className="grid grid-cols-2 gap-6">
        {sections.map(({ title, href, items }) => (
          <section key={title} className="bg-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-fg">{title}</h2>
              <Button variant="secondary" size="sm" asChild>
                <a href={href}>Смотреть все</a>
              </Button>
            </div>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-subtle last:border-0"
                >
                  <span className="text-sm text-fg">{item.name}</span>
                  <Badge>{title.slice(0, -1)}</Badge>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
