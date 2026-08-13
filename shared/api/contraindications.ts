import type { Contraindication, ContraindicationCategory } from '@/shared/types/api';
import { apiFetch } from './fetch';

interface ContraindicationsParams {
  sort?: 'popularity' | 'name';
  category?: string;
}

const SORT_MAP: Record<NonNullable<ContraindicationsParams['sort']>, string> = {
  popularity: '-popularity',
  name: 'name',
}

export async function fetchContraindications(
  params: ContraindicationsParams = {},
): Promise<Contraindication[]> {
  const searchParams = new URLSearchParams();

  if (params.sort) searchParams.set('sort', SORT_MAP[params.sort]);
  if (params.category) searchParams.set('category', params.category);

  const query = searchParams.toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/contraindications/${query ? `?${query}` : ''}`;

  return apiFetch<Contraindication[]>(url);
}

export async function fetchContraindicationById(id: number): Promise<Contraindication | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/contraindications/${id}/`
  return apiFetch<Contraindication>(url).catch(() => null)
}

export async function fetchContraindicationCategories(): Promise<ContraindicationCategory[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/contraindications/categories/`;

  return apiFetch<ContraindicationCategory[]>(url);
}
