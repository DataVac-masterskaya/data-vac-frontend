export const dynamic = 'force-dynamic'

import { SearchResultsPage } from '@/page-components/search'

export default async function VaccinesSearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string
    sort?: string
    infection_id?: string
    ingredient_id?: string
    contraindication_id?: string
  }>
}) {
  const { q = '', sort, infection_id, ingredient_id, contraindication_id } = await searchParams
  return (
    <SearchResultsPage
      query={q}
      sort={sort}
      infectionId={infection_id ? Number(infection_id) : undefined}
      ingredientId={ingredient_id ? Number(ingredient_id) : undefined}
      contraindicationId={contraindication_id ? Number(contraindication_id) : undefined}
    />
  )
}
