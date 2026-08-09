import type { Contraindication, ContraindicationCategory } from '@/shared/types/api';

interface ContraindicationsParams {
  sort?: 'popularity' | 'name';
  // limit?: number;
  category?: string;
}

export async function fetchContraindications(
  params: ContraindicationsParams = {},
): Promise<Contraindication[]> {
  const searchParams = new URLSearchParams()

  if (params.sort) searchParams.set('sort', params.sort)
  if (params.category) searchParams.set('category', params.category)

  const query = searchParams.toString()
  const url = `${process.env.NEXT_PUBLIC_API_URL}/contraindications/${query ? `?${query}` : ''}`

  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`Не удалось получить данные (${res.status})`)
  return res.json() as Promise<Contraindication[]>
}

export async function fetchContraindicationCategories(): Promise<ContraindicationCategory[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/contraindications/categories/`

  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`Не удалось получить данные (${res.status})`)
  return res.json() as Promise<ContraindicationCategory[]>
}
