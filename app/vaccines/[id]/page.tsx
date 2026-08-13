export { default, generateStaticParams } from '@/page-components/vaccines/detail'
export const revalidate = 3600
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { fetchVaccineById } from '@/shared/api/vaccines'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const vaccine = await fetchVaccineById(Number(id))
  return { title: vaccine?.name ?? 'Вакцина' }
}
