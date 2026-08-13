export { default, generateStaticParams } from '@/page-components/infections/detail'
export const revalidate = 3600
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { fetchInfectionById } from '@/shared/api/infections'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const infection = await fetchInfectionById(Number(id))
  return { title: infection?.name ?? 'Инфекция' }
}
