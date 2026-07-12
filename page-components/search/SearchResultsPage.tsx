'use client';

import { useState, useEffect } from 'react';
import { ResultsHeader } from '@/shared/ui/ResultsHeader';
import { EmptyState, ScrollToTopButton } from '@datavac/ui-kit';
import { fetchVaccines } from '@/shared/api/vaccines';
import { mapVaccineToTableRow } from '@/page-components/vaccines/lib/map-vaccine-to-table-row';
import { normalizeVaccineSort } from '@/page-components/vaccines/model/sort';
import { VACCINE_PAGE_WIDTH_CLASS, VaccinesTable } from '@/page-components/vaccines/ui/vaccines-table';

type SearchResultsPageProps = {
  query: string;
};

export function SearchResultsPage({ query }: SearchResultsPageProps) {
  const [vaccines, setVaccines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const sortValue = normalizeVaccineSort(undefined);
      const { results } = await fetchVaccines({
        sort: sortValue,
        q: query,
      });
      const mapped = results.map(mapVaccineToTableRow);
      setVaccines(mapped);
      setIsLoading(false);
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <div className={`${VACCINE_PAGE_WIDTH_CLASS} flex flex-col`}>
      <ResultsHeader title={`Поиск: ${query}`} count={vaccines.length} />

      {isLoading ? (
        <div className="mt-4 text-center text-fg-secondary">Загрузка...</div>
      ) : vaccines.length === 0 ? (
        <div className="mt-4">
          <EmptyState message={`По запросу "${query}" ничего не найдено`} />
        </div>
      ) : (
        <div className="mt-4">
          <VaccinesTable
            vaccines={vaccines}
            sortDirection="asc"
            q={query}
          />
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
}