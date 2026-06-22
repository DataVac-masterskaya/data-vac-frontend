'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ArrowDownArrowUpIcon, Select, SortControl } from '@datavac/ui-kit'
import { useCallback } from 'react'

type SortDirection = 'asc' | 'desc'
type SortValue = 'name_asc' | 'name_desc'

const MOBILE_OPTIONS: { label: string; value: SortValue }[] = [
  { label: 'По названию А – Я', value: 'name_asc' },
  { label: 'По названию Я – А', value: 'name_desc' }
]

export function SortControlWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') || 'name_asc';

  const isActive = (field: string) => {
    return currentSort.startsWith(field);
  }

  const getDirection = (field: string): SortDirection => {
    if (currentSort === `${field}_asc`) return 'asc';
    if (currentSort === `${field}_desc`) return 'desc';
    return 'asc';
  }

  const updateSort = useCallback((sortValue: SortValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortValue);
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, searchParams, router]);

  const handleSortChange = useCallback((field: string, direction: SortDirection) => {
    updateSort(`${field}_${direction}` as SortValue);
  }, [updateSort]);

  const handleMobileChange = useCallback((value: string) => {
    updateSort(value as SortValue);
  }, [updateSort]);

  const direction = getDirection('name');

  const label = direction === 'asc'
    ? 'Сортировать по алфавиту(А–Я)'
    : 'Сортировать по алфавиту (Я–А)';

  return (
    <>
      <div className="hidden md:flex">
        <SortControl
          label={label}
          field="name"
          active={isActive('name')}
          direction={direction}
          onChange={handleSortChange}
          className={"text-sm text-fg-muted"}
        />
      </div>
      <div className="md:hidden">
        <Select
          options={MOBILE_OPTIONS}
          value={currentSort}
          onChange={handleMobileChange}
          icon={<ArrowDownArrowUpIcon width={16} height={16} className="text-accent" />}
        />
      </div>
    </>
  )
}
