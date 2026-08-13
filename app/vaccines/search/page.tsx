export const dynamic = 'force-dynamic'
export const metadata = { title: 'Поиск вакцин' }

import { SearchResultsPage } from '@/page-components/search'

export default async function VaccinesSearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string
    sort?: string
    page?: string
    infection_id?: string
    ingredient_id?: string
    contraindication_id?: string
  }>
}) {
  const { q = '', sort, page, infection_id, ingredient_id, contraindication_id } = await searchParams
  return (
    <SearchResultsPage
      query={q}
      sort={sort}
      page={page ? Math.max(1, Number(page)) : 1}
      infectionId={infection_id ? Number(infection_id) : undefined}
      ingredientId={ingredient_id ? Number(ingredient_id) : undefined}
      contraindicationId={contraindication_id ? Number(contraindication_id) : undefined}
    />
  )
}
