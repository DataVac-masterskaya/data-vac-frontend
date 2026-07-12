import { SearchResultsPage } from '@/page-components/search'
import VaccineListPage from '@/page-components/vaccines/list'

type PageProps = {
  searchParams: Promise<{ q?: string }>
}

export default async function VaccinesPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  if (q) return <SearchResultsPage query={q} />
  return <VaccineListPage />
}
