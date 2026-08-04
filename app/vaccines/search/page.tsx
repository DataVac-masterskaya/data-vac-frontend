export const dynamic = 'force-dynamic'

import { SearchResultsPage } from '@/page-components/search'

export default async function VaccinesSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>
}) {
  const { q = '', sort } = await searchParams
  return <SearchResultsPage query={q} sort={sort} />
}
